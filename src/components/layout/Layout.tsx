import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './header/Header';
import { Footer } from './footer/Footer';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export { Layout };
