import { createSlice } from '@reduxjs/toolkit';
import { loadTokenFromLS } from '../features/ls-load-save';

interface AuthState {
  isAuthenticated: boolean;
  userToken: string;
}

const userTokenFromLS = loadTokenFromLS();

const initialAuthState: AuthState = {
  isAuthenticated: !!userTokenFromLS,
  userToken: userTokenFromLS,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action: { payload: string }) {
      state.isAuthenticated = true;
      state.userToken = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userToken = '';
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
