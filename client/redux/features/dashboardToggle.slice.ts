import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface DashboardToggle {
  notification: boolean;
  leftSidebar: boolean;
}

const initialState: DashboardToggle = {
  leftSidebar: true,
  notification: false,
};

export const dashboardToggle = createSlice({
  initialState,
  name: 'dashboardToggle',
  reducers: {
    toggleNotification: (state) => {
      state.notification = !state.notification;
    },
    toggleLeftSidebar: (state) => {
      state.leftSidebar = !state.leftSidebar;
    },
  },
});

export const selectDashboardToggle = (state: RootState) =>
  state.dashboardToggle;

export const { toggleNotification, toggleLeftSidebar } =
  dashboardToggle.actions;
export default dashboardToggle.reducer;
