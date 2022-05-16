import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BoardType, SigninType, SignupType, ColumnType } from './apiTypes';
import { RootState } from './store';

export const apiUser = createApi({
  reducerPath: 'apiUser',
  tagTypes: ['User', 'Board', 'Column'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bublikbackend.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authStorage.userToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    //USERS
    getUsers: build.query({
      query: () => `users`,
      providesTags: ['User'],
    }),
    getUserById: build.query({
      query: (userId: string) => {
        return {
          url: `users/${userId}`,
        };
      },
      providesTags: ['User'],
    }),
    updateUser: build.mutation({
      query(data: { userId: string; body: SignupType }) {
        const { userId, body } = data;
        return {
          url: `users/${userId}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
    deleteUser: build.mutation({
      query(userId: string) {
        return {
          url: `users/${userId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['User'],
    }),

    //SIGN
    signup: build.mutation({
      query(body: SignupType) {
        return {
          url: `signup`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
    signin: build.mutation({
      query(body: SigninType) {
        console.log('body', body);
        return {
          url: `signin`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),

    //BOARDS
    getBoards: build.query({
      query: () => `boards`,
      providesTags: ['Board'],
    }),
    getBoardsById: build.query({
      query: (boardId: string) => {
        return {
          url: `boards/${boardId}`,
        };
      },
      providesTags: ['Board'],
    }),
    postBoard: build.mutation({
      query(body: BoardType) {
        return {
          url: `boards`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Board'],
    }),
    updateBoard: build.mutation({
      query(data: { boardId: string; body: BoardType }) {
        const { boardId, body } = data;
        return {
          url: `boards/${boardId}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Board'],
    }),
    deleteBoard: build.mutation({
      query(boardId: string) {
        return {
          url: `boards/${boardId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Board'],
    }),

    //COLUMNS
    getColumns: build.query({
      query: (data: { boardId?: string }) => {
        const { boardId } = data;
        return {
          url: `boards/${boardId}/columns`,
        };
      },
      providesTags: ['Column'],
    }),
    getColumnById: build.query({
      query: (data: { columnId: string; boardId: string }) => {
        const { columnId, boardId } = data;
        return {
          url: `boards/${boardId}/columns/${columnId}`,
        };
      },
      providesTags: ['Column'],
    }),
    postColumn: build.mutation({
      // query(body: ColumnType) {
      query(data: { boardId: string; body: ColumnType }) {
        const { boardId, body } = data;
        return {
          url: `boards/${boardId}/columns`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Column'],
    }),
    updateColumn: build.mutation({
      query: (data: { columnId: string; boardId: string; body: ColumnType }) => {
        const { columnId, boardId, body } = data;
        return {
          url: `boards/${boardId}/columns/${columnId}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Column'],
    }),
    deleteColumn: build.mutation({
      query(data: { columnId: string; boardId: string }) {
        const { columnId, boardId } = data;
        return {
          url: `boards/${boardId}/columns/${columnId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Column'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSigninMutation,
  useSignupMutation,
  useDeleteBoardMutation,
  useGetBoardsByIdQuery,
  useGetBoardsQuery,
  usePostBoardMutation,
  useUpdateBoardMutation,
  useDeleteColumnMutation,
  useGetColumnByIdQuery,
  useGetColumnsQuery,
  usePostColumnMutation,
  useUpdateColumnMutation,
} = apiUser;
