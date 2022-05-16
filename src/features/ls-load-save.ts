const team53Auth = 'team53-auth';

export const loadTokenFromLS = (): string => {
  if (!localStorage.getItem(team53Auth)) localStorage.setItem(team53Auth, '');
  return localStorage.getItem(team53Auth) as string;
};

export const saveTokenToLS = (token: string) => {
  console.log(token);
  localStorage.setItem(team53Auth, token);
};
