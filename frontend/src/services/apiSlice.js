import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "../constants/apiConfig";
import { getToken, saveToken, removeToken } from "../utils/tokenStorage";

// Create main API service
export const apiSlice = createApi({
  // Name of the reducer (default is 'api')
  reducerPath: "api",

  // Configure baseQuery to be used with all endpoints
  // Wrap fetchBaseQuery to automatically attach token and handle 401 by clearing it
  baseQuery: (() => {
    const rawBase = fetchBaseQuery({
      baseUrl: API_ENDPOINTS.BASE_URL,
      prepareHeaders: (headers) => {
        const token = getToken();
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
      },
    });

    return async (args, api, extraOptions) => {
      const result = await rawBase(args, api, extraOptions);
      if (result?.error?.status === 401) {
        // token invalid or expired — remove it locally
        removeToken();
      }
      return result;
    };
  })(),

  // 'tagTypes' used for caching - to specify which data types should be invalidated
  tagTypes: ["User", "Chatroom", "Message", "Friend"],

  // 'endpoints' is where we define all API endpoints
  endpoints: (builder) => ({
    // === Authentication ===
    signup: builder.mutation({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.SIGNUP,
        method: "POST",
        body: userData, // { username, password, originallang }
      }),
      // Reset API cache when signup succeeds to ensure clean state
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.token) {
            // Reset the API cache to clear any previous user data
            dispatch(apiSlice.util.resetApiState());
            saveToken(data.token);
          }
        } catch (err) {
          // ignore - error handled by hook consumer
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        body: credentials, // { username, password }
      }),
      // Save token and reset API cache when login succeeds
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.token) {
            // Reset the API cache to clear any previous user data
            dispatch(apiSlice.util.resetApiState());
            saveToken(data.token);
          }
        } catch (err) {
          // ignore - error handled by hook consumer
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: "POST",
      }),
      // Remove token and reset API cache on successful logout
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          removeToken();
          // Reset the entire API cache to clear all user data
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          // ignore
        }
      },
    }),

    // === Users ===
    getUsers: builder.query({
      query: () => API_ENDPOINTS.USERS.GET_ALL,
      // Normalize response so every user has an `id` and `username` field
      transformResponse: (response) => {
        if (!Array.isArray(response)) return response;
        return response.map((u) => ({
          id: u.userid,
          username: u.username,
          originallang: u.originallang,
          ...u,
        }));
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User", id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (id) => API_ENDPOINTS.USERS.GET_BY_ID(id),
      transformResponse: (response) => {
        if (!response) return null;
        return {
          id: response.userid,
          username: response.username,
          originallang: response.originallang,
          ...response,
        };
      },
      providesTags: (result) =>
        result ? [{ type: "User", id: result.id }] : [],
    }),
    getMe: builder.query({
      query: () => API_ENDPOINTS.USERS.GET_ME,
      transformResponse: (response) => {
        if (!response) return null;
        return {
          id: response.userid,
          username: response.username,
          originallang: response.originallang,
          ...response,
        };
      },
      providesTags: (result) =>
        result ? [{ type: "User", id: result.id }] : [],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: API_ENDPOINTS.USERS.UPDATE(id),
        method: "PUT",
        body: patch, // { username, originallang }
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: API_ENDPOINTS.USERS.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // === Chatrooms ===
    getChatrooms: builder.query({
      query: () => API_ENDPOINTS.CHATROOMS.GET_ALL,
      transformResponse: (response) => {
        if (!Array.isArray(response)) return response;
        return response.map((room, idx) => ({
          id: room.id ?? room.roomid ?? room._id ?? `room-${idx}`,
          name: room.name ?? `Room ${room.roomid ?? idx + 1}`,
          members: Array.isArray(room.members) ? room.members : [],
          ...room,
        }));
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Chatroom", id })),
              { type: "Chatroom", id: "LIST" },
            ]
          : [{ type: "Chatroom", id: "LIST" }],
    }),
    getChatroomById: builder.query({
      query: (id) => API_ENDPOINTS.CHATROOMS.GET_BY_ID(id),
      transformResponse: (response) => {
        if (!response) return null;
        return {
          id: response.id,
          name: response.name ?? `Chat ${response.id}`,
          members: Array.isArray(response.members) ? response.members : [],
          ...response,
        };
      },
      providesTags: (result) =>
        result ? [{ type: "Chatroom", id: result.id }] : [],
    }),
    createChatroom: builder.mutation({
      query: (body) => ({
        // body: { targetuserid }
        url: API_ENDPOINTS.CHATROOMS.CREATE,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Chatroom", id: "LIST" }],
    }),
    deleteChatroom: builder.mutation({
      query: (id) => ({
        url: API_ENDPOINTS.CHATROOMS.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Chatroom", id },
        { type: "Chatroom", id: "LIST" }
      ],
    }),

    // === Messages ===
    getMessagesByRoom: builder.query({
      // arg will be { id: chatRoomId, filter: 'sent' | 'received' }
      query: ({ id, filter }) => ({
        url: API_ENDPOINTS.MESSAGES.GET_BY_ROOM(id),
        params: { filter },
      }),
      transformResponse: (response) => {
        if (!Array.isArray(response)) return response;
        return response.map((msg, idx) => ({
          id: msg.id ?? msg._id ?? `msg-${Date.now()}-${idx}`,
          roomId: msg.roomId ?? msg.chatroomId,
          senderId: msg.senderId ?? msg.userId,
          text: msg.originalmessage ?? msg.text ?? msg.content ?? '',
          timestamp: msg.timestamp ?? msg.createdAt ?? msg.date ?? new Date().toISOString(),
          ...msg,
        }));
      },
      providesTags: (result, error, { id }) => [
        { type: "Message", id: `ROOM_${id}` },
      ],
    }),
    getMessageById: builder.query({
      query: (id) => API_ENDPOINTS.MESSAGES.GET_BY_ID(id),
      transformResponse: (response) => {
        if (!response) return null;
        return {
          id: response.id,
          roomId: response.roomId ?? response.chatroomId,
          senderId: response.senderId ?? response.userId,
          text: response.originalmessage ?? response.text ?? response.content ?? '',
          timestamp: response.timestamp ?? response.createdAt ?? response.date ?? new Date().toISOString(),
          ...response,
        };
      },
      providesTags: (result) =>
        result ? [{ type: "Message", id: result.id }] : [],
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        // body: { originalmessage, roomid }
        url: API_ENDPOINTS.MESSAGES.CREATE,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { roomid }) => [
        { type: "Message", id: `ROOM_${roomid}` },
      ],
    }),
    updateMessage: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: API_ENDPOINTS.MESSAGES.UPDATE(id),
        method: "PUT",
        body: patch, // { originalmessage, roomid }
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Message", id },
        { type: "Message", id: `ROOM_${result?.roomId}` } // Invalidate room messages cache
      ],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: API_ENDPOINTS.MESSAGES.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Message", id },
        { type: "Message", id: `ROOM_${result?.roomId}` } // Invalidate room messages cache
      ],
    }),

    // === Friends ===
    getMyFriendStatus: builder.query({
      query: () => API_ENDPOINTS.FRIENDS.GET_STATUS,
      transformResponse: (response) => {
        // Backend returns an object with separate arrays for friends, pendingSent, and pendingReceived
        if (!response || typeof response !== 'object') return [];
        
        const { friends = [], pendingSent = [], pendingReceived = [] } = response;
        
        // Combine all three arrays into a single array of friendship objects
        const allFriendships = [
          ...friends.map(friendship => ({ ...friendship, status: 'accepted' })),
          ...pendingSent.map(friendship => ({ ...friendship, status: 'pending' })),
          ...pendingReceived.map(friendship => ({ ...friendship, status: 'pending' }))
        ];
        
        return allFriendships.map((friendship) => {
          // Extract sender and receiver before spreading other properties
          // The backend model uses 'friendshipid' as the primary key field name
          const id = friendship.friendshipid || 
                     friendship.id || 
                     friendship.friendshipId || 
                     friendship._id || 
                     (friendship.dataValues ? friendship.dataValues.friendshipid : undefined);
          
          const transformedFriendship = {
            id: id,
            // Keep the original field name for reference if needed elsewhere
            friendshipid: id,
            // Use the status we explicitly assigned, fallback to 'pending' if somehow undefined
            status: friendship.status || 'pending', 
            sender: friendship.sender ? {
              id: friendship.sender.userid,
              username: friendship.sender.username,
              ...friendship.sender,
            } : null,
            receiver: friendship.receiver ? {
              id: friendship.receiver.userid,
              username: friendship.receiver.username,
              ...friendship.receiver,
            } : null,
          };
          
          // Spread other properties, but don't override the sender/receiver we just created
          const { sender, receiver, ...otherProps } = friendship;
          return { ...transformedFriendship, ...otherProps };
        });
      },
      providesTags: (result) => 
        result
          ? [...result.map(({ id }) => ({ type: "Friend", id })), "Friend"]
          : ["Friend"],
    }),
    sendFriendRequest: builder.mutation({
      query: (body) => ({
        // body: { targetid }
        url: API_ENDPOINTS.FRIENDS.REQUEST,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Friend"],
    }),
    respondToRequest: builder.mutation({
      query: ({ friendshipId, response }) => ({
        url: API_ENDPOINTS.FRIENDS.RESPOND(friendshipId),
        method: "PUT",
        body: { response },
      }),
      invalidatesTags: ["Friend", "Chatroom"],
    }),
    deleteFriend: builder.mutation({
      query: (friendshipid) => ({
        url: API_ENDPOINTS.FRIENDS.DELETE(friendshipid),
        method: "DELETE",
      }),
      invalidatesTags: ["Friend"],
    }),
  }),
});

// RTK Query generates Hooks automatically from "endpoints" we define
export const {
  // Auth
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  // Users
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetMeQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  // Chatrooms
  useGetChatroomsQuery,
  useGetChatroomByIdQuery,
  useCreateChatroomMutation,
  useDeleteChatroomMutation,
  // Messages
  useGetMessagesByRoomQuery,
  useGetMessageByIdQuery,
  useSendMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  // Friends
  useGetMyFriendStatusQuery,
  useSendFriendRequestMutation,
  useRespondToRequestMutation,
  useDeleteFriendMutation,
} = apiSlice;