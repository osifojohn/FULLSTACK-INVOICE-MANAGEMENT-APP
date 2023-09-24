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
  tagTypes: ['InvoicesDateRange', 'InvoicesDateRangeChart', 'SeachedInvoice'],
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
                type: 'InvoicesDateRange' as const,
                _id,
              })),
              { type: 'InvoicesDateRange', _id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'InvoicesDateRange', _id: 'PARTIAL-LIST' }],
    }),

    getInvoiceByDateRangeChart: builder.query<
      InvoiceData,
      { queryStartDate?: string | undefined }
    >({
      query: ({ queryStartDate }) =>
        `chart-date-range?queryStartDate=${queryStartDate}`,
      providesTags: (result, error, page) =>
        result
          ? [
              ...result?.invoices.map(({ _id }) => ({
                type: 'InvoicesDateRangeChart' as const,
                _id,
              })),
              { type: 'InvoicesDateRangeChart', _id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'InvoicesDateRangeChart', _id: 'PARTIAL-LIST' }],
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
  useGetInvoiceByDateRangeChartQuery,
} = invoiceApi;
