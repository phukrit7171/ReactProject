import { api } from '../../services/api';

export const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ originalmessage, roomid }) => ({
        url: '/v1/messages',
        method: 'POST',
        body: { originalmessage, roomid },
      }),
      invalidatesTags: ['Message'],
    }),
    getMessageById: builder.query({
      query: (id) => `/v1/messages/${id}`,
      providesTags: ['Message'],
    }),
    getMessagesByChatroom: builder.query({
      query: (id) => `/v1/messages/chatrooms/${id}`,
      providesTags: ['Message'],
    }),
    getSentMessages: builder.query({
      query: (id) => `/v1/messages/chatrooms/${id}?filter=sent`,
      providesTags: ['Message'],
    }),
    getReceivedMessages: builder.query({
      query: (id) => `/v1/messages/chatrooms/${id}?filter=received`,
      providesTags: ['Message'],
    }),
    updateMessage: builder.mutation({
      query: ({ id, originalmessage, roomid }) => ({
        url: `/v1/messages/${id}`,
        method: 'PUT',
        body: { originalmessage, roomid },
      }),
      invalidatesTags: ['Message'],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/v1/messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSendMessageMutation,
  useGetMessageByIdQuery,
  useGetMessagesByChatroomQuery,
  useGetSentMessagesQuery,
  useGetReceivedMessagesQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;