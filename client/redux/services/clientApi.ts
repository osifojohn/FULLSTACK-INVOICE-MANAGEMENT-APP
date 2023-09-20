import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { HTTP_METHODS } from '../../types';
import { RootState } from '../store';

export const clientApi = createApi({
  reducerPath: 'clientApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/client/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.user?.accessToken;
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ['Clients'],

  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => '/',
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ _id }: { _id: string }) => ({
                type: 'Clients',
                _id,
              })),
              'Clients',
            ]
          : ['Clients'],
    }),

    addClients: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: '',
          method: HTTP_METHODS.POST,
          body,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: clients } = await queryFulfilled;
          dispatch(
            clientApi.util.updateQueryData('getClients', undefined, (draft) => {
              Object.assign(draft, clients);
            })
          );
        } catch {}
      },
    }),

    updateClient: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: HTTP_METHODS.PATCH,
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          const { data: updateClient } = await queryFulfilled;
          dispatch(
            clientApi.util.updateQueryData('getClients', id, (draft) => {
              Object.assign(draft, updateClient);
            })
          );
        } catch {}
      },
    }),
  }),
});

export const { useAddClientsMutation } = clientApi;
