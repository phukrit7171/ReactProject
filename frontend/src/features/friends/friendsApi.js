import { api } from '../../services/api';

export const friendsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendFriendRequest: builder.mutation({
      query: (targetid) => ({
        url: '/v1/friend/request',
        method: 'POST',
        body: { targetid },
      }),
      invalidatesTags: ['Friend'],
    }),
    getFriendStatus: builder.query({
      query: () => '/v1/friend/status/me',
      providesTags: ['Friend'],
    }),
    respondToFriendRequest: builder.mutation({
      query: ({ friendshipid, response }) => ({
        url: `/v1/friend/response/${friendshipid}`,
        method: 'PUT',
        body: { response },
      }),
      invalidatesTags: ['Friend'],
    }),
    deleteFriend: builder.mutation({
      query: (friendshipid) => ({
        url: `/v1/friend/response/${friendshipid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Friend'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSendFriendRequestMutation,
  useGetFriendStatusQuery,
  useRespondToFriendRequestMutation,
  useDeleteFriendMutation,
} = friendsApi;