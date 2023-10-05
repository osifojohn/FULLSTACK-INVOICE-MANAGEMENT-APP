import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import {
  HTTP_METHODS,
  Notification,
  NotificationData,
  PaginationOptions,
} from '../../types';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/notification/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.user?.accessToken;
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['NOTIFICATION', 'NOTIFICATION-SEEN'],
  endpoints: (builder) => ({
    getAllNotifications: builder.query<NotificationData, PaginationOptions>({
      query: ({ page = 1, limit = 10 }) =>
        `all-notifications?page=${page}&limit=${limit}`,
    }),

    setNotificationToSeen: builder.mutation<Notification, any>({
      query: ({ noticationId, ...patch }) => {
        return {
          url: `notification-seen`,
          method: HTTP_METHODS.POST,
          body: noticationId,
        };
      },

      async onQueryStarted(
        { noticationId, ...patch },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: updatedNotification } = await queryFulfilled;
          dispatch(
            notificationApi.util.updateQueryData(
              'getAllNotifications',
              noticationId,
              (draft) => {
                Object.assign(draft, updatedNotification);
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetAllNotificationsQuery, useSetNotificationToSeenMutation } =
  notificationApi;
