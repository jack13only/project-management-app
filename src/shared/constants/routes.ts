interface IPATH {
  main: string;
  boards: string;
  boadrsId: string;
  notFound: string;
}

export const PATHS: IPATH = {
  main: '/',
  boards: '/boards',
  boadrsId: '/boards/:id',
  notFound: '*',
};
