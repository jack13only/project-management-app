import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userName: string;
  userId: string;
  // userLogin: string;
}

const initialUserState: UserState = {
  userName: '',
  userId: '',
  // userLogin: '',
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState: initialUserState,
  reducers: {
    setUserData(state, action: { payload: UserState }) {
      return action.payload;
    },
    setEmptyUser() {
      return initialUserState;
    },
  },
});

export const { setUserData, setEmptyUser } = userSlice.actions;
export default userSlice.reducer;
