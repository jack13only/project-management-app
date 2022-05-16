import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { WelcomePage } from './pages/welcomePage1/WelcomePage';
import { Boards } from './pages/boards/Boards';
import { Board } from './pages/board/Board';
import { NotFound } from './pages/notfound/NotFound';
import { PATHS } from './shared/constants/routes';

import './App.scss';
import RequireAuth from './components/requireAuth/RequireAuth';
import SignIn from './pages/signIn1/SignIn1';
import SignUp from './pages/signUp1/SignUp1';

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
          path={PATHS.board}
          element={
            <RequireAuth>
              <Board />
            </RequireAuth>
          }
        />
        <Route path={PATHS.signIn} element={<SignIn />} />
        <Route path={PATHS.signUp} element={<SignUp />} />
        <Route path={PATHS.notFound} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export { App };
