import { ReactElement, Suspense } from 'react';
import { Preloader } from './Preloader';

type Children = {
  children: ReactElement;
};

const PreloaderSuspense = ({ children }: Children) => {
  return <Suspense fallback={<Preloader />}>{children}</Suspense>;
};

export { PreloaderSuspense };
