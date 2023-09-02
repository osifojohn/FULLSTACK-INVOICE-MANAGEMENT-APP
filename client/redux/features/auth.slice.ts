import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { User } from '@/types';

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
