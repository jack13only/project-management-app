import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiUser } from './RtkQuery';
import authSlice from '../reducers/auth';
import userSlice from '../reducers/userReducer';

export const store = configureStore({
  reducer: {
    authStorage: authSlice,
    userStorage: userSlice,
    [apiUser.reducerPath]: apiUser.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiUser.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
