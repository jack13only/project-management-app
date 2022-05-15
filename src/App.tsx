import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { WelcomePage } from './pages/welcomepage/WelcomePage';
import { Boards } from './pages/boards/Boards';
import { Board } from './pages/board/Board';
import { NotFound } from './pages/notfound/NotFound';
import { PATHS } from './shared/constants/routes';

import './App.scss';
import RequireAuth from './components/requireAuth/RequireAuth';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';

const App: FC = () => {
  return (
    <Routes>
      <Route path={PATHS.main} element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route
          path={PATHS.boards}
          element={
            <RequireAuth>
              <Boards />
            </RequireAuth>
          }
        />
        <Route
          path={PATHS.boadrsId}
          element={
            <RequireAuth>
              <Board />
            </RequireAuth>
          }
        />
        <Route path={PATHS.signIn} element={<Signin />} />
        <Route path={PATHS.signUp} element={<Signup />} />
        <Route path={PATHS.notFound} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export { App };
