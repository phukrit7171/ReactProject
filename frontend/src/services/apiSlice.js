import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "../constants/apiConfig";
import { getToken, saveToken, removeToken } from "../utils/tokenStorage";

// สร้าง API service หลัก
export const apiSlice = createApi({
  // ชื่อของ reducer (default คือ 'api')
  reducerPath: "api",

  // ตั้งค่า baseQuery ที่จะใช้กับทุก endpoint
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

  // 'tagTypes' ใช้สำหรับ Caching - เพื่อบอกว่าข้อมูลประเภทไหนควรจะ "invalidate"
  tagTypes: ["User", "Chatroom", "Message", "Friend"],

  // 'endpoints' คือที่ที่เราจะกำหนด API ทั้งหมด
  endpoints: (builder) => ({
    // === Authentication ===
    signup: builder.mutation({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.SIGNUP,
        method: "POST",
        body: userData, // { username, password, originallang }
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        body: credentials, // { username, password }
      }),
      // Save token to localStorage when login succeeds
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.token) {
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
      // Remove token on successful logout
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          removeToken();
          // optionally: dispatch(apiSlice.util.resetApiState()) if you want to clear cache
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
          id: u.userid, // API ส่ง userid มา
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
          id: room.id ?? room._id ?? `room-${idx}`,
          name: room.name ?? room.title ?? `Chat ${idx + 1}`,
          members: Array.isArray(room.members) ? room.members.map(member => ({
            id: member.id ?? member._id,
            username: member.username ?? member.name ?? 'Unknown User',
            ...member,
          })) : [],
          lastMessage: room.lastMessage ? {
            id: room.lastMessage.id ?? room.lastMessage._id,
            text: room.lastMessage.text ?? room.lastMessage.content ?? '',
            senderId: room.lastMessage.senderId ?? room.lastMessage.userId,
            timestamp: room.lastMessage.timestamp ?? room.lastMessage.createdAt,
            ...room.lastMessage,
          } : null,
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
    createChatroom: builder.mutation({
      query: (body) => ({
        // body: { targetuserid }
        url: API_ENDPOINTS.CHATROOMS.CREATE,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Chatroom", id: "LIST" }],
    }),

    // === Messages ===
    getMessagesByRoom: builder.query({
      // arg จะเป็น { id: chatRoomId, filter: 'sent' | 'received' }
      query: ({ id, filter }) => ({
        url: API_ENDPOINTS.MESSAGES.GET_BY_ROOM(id),
        params: { filter },
      }),
      transformResponse: (response) => {
        if (!Array.isArray(response)) return response;
        return response.map((msg, idx) => ({
          id: msg.id ?? msg._id ?? `msg-${Date.now()}-${idx}`,
          roomId: msg.roomId ?? msg.chatroomId,
          senderId: msg.senderId ?? msg.userId ?? msg.from,
          text: msg.text ?? msg.content ?? msg.message ?? '',
          timestamp: msg.timestamp ?? msg.createdAt ?? msg.date ?? new Date().toISOString(),
          translatedText: msg.translatedText ?? msg.translated ?? null,
          status: msg.status ?? 'sent',
          ...msg,
        }));
      },
      providesTags: (result, error, { id }) => [
        { type: "Message", id: `ROOM_${id}` },
      ],
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

    // === Friends ===
    getMyFriendStatus: builder.query({
      query: () => API_ENDPOINTS.FRIENDS.GET_STATUS,
      // Normalize friend data to ensure consistent shape
      transformResponse: (response) => {
        if (!Array.isArray(response)) return [];
        return response.map((friendship) => ({
          id: friendship.friendshipid ?? friendship.id,
          status: friendship.status ?? 'pending',
          // Normalize user data within friendship
          user: friendship.user ? {
            id: friendship.user.userid,
            username: friendship.user.username,
            originallang: friendship.user.originallang,
            ...friendship.user,
          } : null,
          sender: friendship.sender ? {
            id: friendship.sender.userid,
            username: friendship.sender.username,
            originallang: friendship.sender.originallang,
            ...friendship.sender,
          } : null,
          receiver: friendship.receiver ? {
            id: friendship.receiver.userid,
            username: friendship.receiver.username,
            originallang: friendship.receiver.originallang,
            ...friendship.receiver,
          } : null,
          createdAt: friendship.createdAt ?? friendship.timestamp ?? new Date().toISOString(),
          ...friendship,
        }));
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
      // arg: { friendshipid, response: 'accept' | 'decline' }
      query: ({ friendshipid, response }) => ({
        url: API_ENDPOINTS.FRIENDS.RESPOND(friendshipid),
        method: "PUT",
        body: { response },
      }),
      invalidatesTags: ["Friend"],
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

// RTK Query จะสร้าง Hooks ให้เราอัตโนมัติจาก "endpoints" ที่เรากำหนด
export const {
  // Auth
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  // Users
  useGetUsersQuery,
  useGetMeQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  // Chatrooms
  useGetChatroomsQuery,
  useCreateChatroomMutation,
  // Messages
  useGetMessagesByRoomQuery,
  useSendMessageMutation,
  // Friends
  useGetMyFriendStatusQuery,
  useSendFriendRequestMutation,
  useRespondToRequestMutation,
  useDeleteFriendMutation,
} = apiSlice;