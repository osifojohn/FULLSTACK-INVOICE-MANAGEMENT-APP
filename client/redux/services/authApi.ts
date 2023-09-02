import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HTTP_METHODS, IUserAdmin, User } from '../../types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<User, { [key: string]: string }>({
      query: (body: { [key: string]: string }) => {
        return {
          url: 'login',
          method: HTTP_METHODS.POST,
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: IUserAdmin) => {
        return {
          url: 'admin',
          method: HTTP_METHODS.POST,
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
