import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { apiUser } from './RtkQuery';
import authSlice from '../reducers/auth';
import userSlice from '../reducers/userReducer';
import langSlice from '../reducers/langReducer';
import { localStorageMiddleware } from '../middleware/ls-middleware';

export const store = configureStore({
  reducer: {
    authStorage: authSlice,
    userStorage: userSlice,
    langStorage: langSlice,
    [apiUser.reducerPath]: apiUser.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiUser.middleware, localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
