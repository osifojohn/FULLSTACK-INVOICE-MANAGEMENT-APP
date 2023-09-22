import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { HTTP_METHODS, GetInvoice, InvoiceData } from '../../types';
import { RootState } from '../store';

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/invoice/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.user?.accessToken;
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Invoices', 'SeachedInvoice'],
  endpoints: (builder) => ({
    getInvoiceByDateRange: builder.query<
      InvoiceData,
      GetInvoice & { queryStartDate?: string }
    >({
      query: ({ page = 1, limit = 10, queryStartDate }) =>
        `date-range?page=${page}&limit=${limit}&queryStartDate=${queryStartDate}`,
      providesTags: (result, error, page) =>
        result
          ? [
              ...result?.invoices.map(({ _id }) => ({
                type: 'Invoices' as const,
                _id,
              })),
              { type: 'Invoices', _id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Invoices', _id: 'PARTIAL-LIST' }],
    }),

    getSearchInvoiceByClientName: builder.query<
      InvoiceData,
      GetInvoice & { keyword?: string }
    >({
      query: ({ page = 1, limit = 10, keyword }) =>
        `search?page=${page}&limit=${limit}&keyword=${keyword}`,
    }),
  }),
});

export const {
  useGetInvoiceByDateRangeQuery,
  useGetSearchInvoiceByClientNameQuery,
} = invoiceApi;
