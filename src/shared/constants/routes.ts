interface IPATH {
  main: string;
  boards: string;
  boadrsId: string;
  signIn: string;
  signUp: string;
  notFound: string;
}

export const PATHS: IPATH = {
  main: '/',
  boards: '/boards',
  boadrsId: '/boards/:id',
  signIn: '/signin',
  signUp: '/signup',
  notFound: '*',
};
