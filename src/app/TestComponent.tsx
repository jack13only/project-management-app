import { createRef, FC, useEffect, useState } from 'react';
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSigninMutation,
  useSignupMutation,
  useGetBoardsQuery,
  useGetFileQuery,
  usePostFileMutation,
} from './RtkQuery';

type User = {
  name: string;
  id: string;
};
type Board = {
  title: string;
  id: string;
};

const TestComponent: FC = () => {
  const file: React.RefObject<HTMLInputElement> = createRef();
  //TODO: remove this after test
  // const { data, error } = useGetUserByIdQuery('c7fb9a8a-aec7-45e0-82f2-fa361a3ce8f1');
  const [value, setValue] = useState('');
  const userUpdate = {
    id: '82abe1e9-8941-49d6-bb31-c902632262bf',
    body: {
      name: value,
      login: 'ololoqq',
      password: 'qwertyqq',
    },
  };
  const userSignin = {
    login: 'ololoqq',
    password: 'qwertyqq',
  };

  const userSignup = {
    name: value,
    login: value + 'test',
    password: value + 'pass',
  };

  // const { data = [], error } = useGetUsersQuery('');
  const { data, error } = useGetFileQuery({ taskId: '78aa1f09-6a53-4aaf-a4ea-ba2b18e9888c' });
  const [postFile] = usePostFileMutation();
  // const [deleteUser] = useDeleteUserMutation();
  // const [signinUser] = useSigninMutation();
  // const [signupUser] = useSignupMutation();

  // const handleUpdateUser = async () => await signupUser(userSignupOrUpdate);
  // const handleUpdateUser = async () => await signupUser(userSignup);
  // const handlesigninUser = async () => {
  //   token = await signinUser(userSignin).unwrap();
  //   console.log(token);
  // };
  // const handleDeleteUser = async () => await deleteUser('82abe1e9-8941-49d6-bb31-c902632262bf');

  useEffect(() => {
    console.log('data', data);
    console.log('error', error);
  }, [data, error]);

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const handlePostFile = () => {
    const reader = new FileReader();
    // const fileString = URL.createObjectURL((file.current?.files as FileList)[0]);
    const file1 = file.current?.files?.[0];
    reader.readAsDataURL(file1 as File);
    reader.onloadend = () => {
      postFile({ taskId: '78aa1f09-6a53-4aaf-a4ea-ba2b18e9888c', file: reader.result as string });
      console.log('file1', reader.result);
    };
    console.log('file', file1);
  };

  return (
    <div data-testid="welcomepage">
      <input type="file" onChange={handlePostFile} ref={file} />
      {/* <button onClick={handlePostFile}>file</button> */}
    </div>
  );
};

// {
//   "id": "78aa1f09-6a53-4aaf-a4ea-ba2b18e9888c",
//   "title": "Task: pet the cat",
//   "order": 1,
//   "description": "Domestic cat needs to be stroked gently",
//   "userId": "37e596ea-e3b8-4515-9eb2-48f1e6ed6204",
//   "boardId": "4b5f6c2d-dffe-4e33-bb18-09aff3516caf",
//   "columnId": "e9c9747f-99cd-401d-a36c-8a0c56b1708a",
//   "files": []
// }

export { TestComponent };
