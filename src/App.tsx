import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { WelcomePage } from './pages/welcomePage/WelcomePage';
import { Boards } from './pages/boards/Boards';
import { Board } from './pages/board/Board';
import { NotFound } from './pages/notfound/NotFound';
import { PATHS } from './shared/constants/routes';

import './App.scss';
import RequireAuth from './components/requireAuth/RequireAuth';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';

const App: FC = () => {
  return (
    <Routes>
      <Route path={PATHS.main} element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route
          path={PATHS.boards}
          element={
            <RequireAuth needAuth={true}>
              <Boards />
            </RequireAuth>
          }
        />
        <Route
          path={PATHS.board}
          element={
            <RequireAuth needAuth={true}>
              <Board />
            </RequireAuth>
          }
        />
        <Route
          path={PATHS.signIn}
          element={
            <RequireAuth needAuth={false}>
              <SignIn />
            </RequireAuth>
          }
        />
        <Route
          path={PATHS.signUp}
          element={
            <RequireAuth needAuth={false}>
              <SignUp />
            </RequireAuth>
          }
        />
        <Route path={PATHS.notFound} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export { App };
