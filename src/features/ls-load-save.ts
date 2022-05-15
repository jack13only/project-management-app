export const loadTokenFromLS = (): string => {
  if (!localStorage.getItem('team53-auth-token')) localStorage.setItem('team53-auth-token', '');
  return localStorage.getItem('team53-auth-token') as string;
};

export const saveTokenToLS = (token: string) => {
  console.log(token);
  localStorage.setItem('team53-auth-token', token);
};
