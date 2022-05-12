import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { WelcomePage } from './pages/welcomepage/WelcomePage';
import { Boards } from './pages/boards/Boards';
import { Board } from './pages/board/Board';
import { NotFound } from './pages/notfound/NotFound';

import './App.scss';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="boards" element={<Boards />} />

        {/* todo: delete the next one path after fixing routes and functionallity for a new board and columns */}

        <Route path="/boards/board" element={<Board />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export { App };
