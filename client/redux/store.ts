import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { configureStore } from '@reduxjs/toolkit';

import dashboardToggleReducer from './features/dashboardToggle.slice';
import { notificationApi } from './services/notificationApi';
import invoicePdfReducer from './features/invoice.slice';
import { invoiceApi } from './services/invoiceApi';
import authReducer from './features/auth.slice';
import { authApi } from './services/authApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboardToggle: dashboardToggleReducer,
    invoicePdf: invoicePdfReducer,
    [authApi.reducerPath]: authApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      invoiceApi.middleware,
      notificationApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
