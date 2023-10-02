import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface DashboardToggle {
  notification: boolean;
  mobileNotification: boolean;
  leftSidebar: boolean;
}

const initialState: DashboardToggle = {
  leftSidebar: true,
  notification: false,
  mobileNotification: false,
};

export const dashboardToggle = createSlice({
  initialState,
  name: 'dashboardToggle',
  reducers: {
    toggleNotification: (state) => {
      state.notification = !state.notification;
    },
    toggleNotificationMobile: (state) => {
      state.mobileNotification = !state.mobileNotification;
    },
    toggleLeftSidebar: (state) => {
      state.leftSidebar = !state.leftSidebar;
    },
  },
});

export const selectDashboardToggle = (state: RootState) =>
  state.dashboardToggle;

export const {
  toggleNotification,
  toggleLeftSidebar,
  toggleNotificationMobile,
} = dashboardToggle.actions;

export default dashboardToggle.reducer;
