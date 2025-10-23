import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS } from '../constants/apiConfig'; //
import { getToken } from '../utils/tokenStorage'; //

// สร้าง API service หลัก
export const apiSlice = createApi({
  // ชื่อของ reducer (default คือ 'api')
  reducerPath: 'api',
  
  // ตั้งค่า baseQuery ที่จะใช้กับทุก endpoint
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINTS.BASE_URL, //
    // เตรียม header ก่อนส่ง request ทุกครั้ง
    prepareHeaders: (headers, { getState }) => {
      const token = getToken(); //
      if (token) {
        // สมมติว่า Backend ใช้ Bearer Token
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // 'tagTypes' ใช้สำหรับ Caching - เพื่อบอกว่าข้อมูลประเภทไหนควรจะ "invalidate"
  tagTypes: ['User', 'Chatroom', 'Message', 'Friend'],

  // 'endpoints' คือที่ที่เราจะกำหนด API ทั้งหมด
  endpoints: (builder) => ({
    
    // === Authentication ===
    signup: builder.mutation({
      query: (userData) => ({
        url: API_ENDPOINTS.AUTH.SIGNUP,
        method: 'POST',
        body: userData, // { username, password, originallang }
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: 'POST',
        body: credentials, // { username, password }
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'POST',
      }),
    }),

    // === Users ===
    getUsers: builder.query({
      query: () => API_ENDPOINTS.USERS.GET_ALL,
      providesTags: (result) => 
        result ? [
          ...result.map(({ id }) => ({ type: 'User', id })),
          { type: 'User', id: 'LIST' },
        ] : [{ type: 'User', id: 'LIST' }],
    }),
    getMe: builder.query({
      query: () => API_ENDPOINTS.USERS.GET_ME,
      providesTags: (result) => result ? [{ type: 'User', id: result.id }] : [],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: API_ENDPOINTS.USERS.UPDATE(id),
        method: 'PUT',
        body: patch, // { username, originallang }
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: API_ENDPOINTS.USERS.DELETE(id),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // === Chatrooms ===
    getChatrooms: builder.query({
      query: () => API_ENDPOINTS.CHATROOMS.GET_ALL,
      providesTags: (result) =>
        result ? [
          ...result.map(({ id }) => ({ type: 'Chatroom', id })),
          { type: 'Chatroom', id: 'LIST' },
        ] : [{ type: 'Chatroom', id: 'LIST' }],
    }),
    createChatroom: builder.mutation({
      query: (body) => ({ // body: { targetuserid }
        url: API_ENDPOINTS.CHATROOMS.CREATE,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Chatroom', id: 'LIST' }],
    }),

    // === Messages ===
    getMessagesByRoom: builder.query({
      // arg จะเป็น { id: chatRoomId, filter: 'sent' | 'received' }
      query: ({ id, filter }) => ({
        url: API_ENDPOINTS.MESSAGES.GET_BY_ROOM(id),
        params: { filter },
      }),
      providesTags: (result, error, { id }) => [{ type: 'Message', id: `ROOM_${id}` }],
    }),
    sendMessage: builder.mutation({
      query: (body) => ({ // body: { originalmessage, roomid }
        url: API_ENDPOINTS.MESSAGES.CREATE,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { roomid }) => [{ type: 'Message', id: `ROOM_${roomid}` }],
    }),

    // === Friends ===
    getMyFriendStatus: builder.query({
      query: () => API_ENDPOINTS.FRIENDS.GET_STATUS,
      providesTags: ['Friend'],
    }),
    sendFriendRequest: builder.mutation({
      query: (body) => ({ // body: { targetid }
        url: API_ENDPOINTS.FRIENDS.REQUEST,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Friend'],
    }),
    respondToRequest: builder.mutation({
      // arg: { friendshipid, response: 'accept' | 'decline' }
      query: ({ friendshipid, response }) => ({
        url: API_ENDPOINTS.FRIENDS.RESPOND(friendshipid),
        method: 'PUT',
        body: { response },
      }),
      invalidatesTags: ['Friend'],
    }),
    deleteFriend: builder.mutation({
      query: (friendshipid) => ({
        url: API_ENDPOINTS.FRIENDS.DELETE(friendshipid),
        method: 'DELETE',
      }),
      invalidatesTags: ['Friend'],
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