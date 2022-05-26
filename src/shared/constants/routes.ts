interface IPATH {
  main: string;
  boards: string;
  board: string;
  signIn: string;
  signUp: string;
  userProfile: string;
  notFound: string;
}

export const PATHS: IPATH = {
  main: '/',
  boards: '/boards',
  board: '/boards/:id',
  signIn: '/signin',
  signUp: '/signup',
  userProfile: '/userprofile',
  notFound: '*',
};
