export const loadTokenFromLS = (): string => {
  if (!localStorage.getItem('team53-auth-token'))
    localStorage.setItem('team53-auth-token', JSON.stringify(''));
  return JSON.parse(localStorage.getItem('team53-auth-token') as string);
};
