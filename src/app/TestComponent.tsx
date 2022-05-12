import { FC, useEffect, useState } from 'react';
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSigninMutation,
  useSignupMutation,
  useGetBoardsQuery,
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

  let token = '';

  // const { data = [], error } = useGetUsersQuery('');
  const { data = [], error } = useGetBoardsQuery('');
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [signinUser] = useSigninMutation();
  const [signupUser] = useSignupMutation();

  // const handleUpdateUser = async () => await signupUser(userSignupOrUpdate);
  const handleUpdateUser = async () => await signupUser(userSignup);
  const handlesigninUser = async () => {
    token = await signinUser(userSignin).unwrap();
    console.log(token);
  };
  const handleDeleteUser = async () => await deleteUser('82abe1e9-8941-49d6-bb31-c902632262bf');

  useEffect(() => {
    console.log('data', data);
    console.log('error', error);
  }, [data, error]);

  if (error && 'status' in error) {
    console.log('error.data', error.status);
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div data-testid="welcomepage">
      {data &&
        data.map((item: Board) => (
          <div key={item.id}>
            <div>Boards: {item.title}</div>
            {/* <div>Name: {item.name}</div> */}
            {/* <div>Id: {item.id}</div> */}
          </div>
        ))}

      <input type="text" onChange={onChange} value={value} />
      <button onClick={handleUpdateUser}>signup User</button>
      <button onClick={handlesigninUser}>signin User</button>
      <button onClick={handleDeleteUser}>Delete</button>
      <div>{token}</div>
    </div>
  );
};

export { TestComponent };
