import { api } from '../../services/api';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/v1/users/me',
      providesTags: ['User'],
    }),
    getAllUsers: builder.query({
      query: () => '/v1/users',
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => `/v1/users/${id}`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/v1/users/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/v1/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;