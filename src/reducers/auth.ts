import { createSlice } from '@reduxjs/toolkit';
import { loadTokenFromLS } from '../features/ls-load-save';

interface AuthState {
  userToken: string;
}

const userTokenFromLS = loadTokenFromLS();

const initialAuthState: AuthState = {
  userToken: userTokenFromLS,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    loginUser(state, action: { payload: string }) {
      state.userToken = action.payload;
    },
    logoutUser(state) {
      state.userToken = '';
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
