import { api } from '../../services/api';

export const chatroomsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => '/v1/chatrooms',
      providesTags: ['Chatroom'],
    }),
    getRoom: builder.query({
      query: (id) => `/v1/chatrooms/${id}`,
      providesTags: ['Chatroom'],
    }),
    createRoom: builder.mutation({
      query: ({ targetuserid }) => ({
        url: '/v1/chatrooms',
        method: 'POST',
        body: { targetuserid },
      }),
      invalidatesTags: ['Chatroom'],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/v1/chatrooms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chatroom'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRoomsQuery,
  useGetRoomQuery,
  useCreateRoomMutation,
  useDeleteRoomMutation,
} = chatroomsApi;