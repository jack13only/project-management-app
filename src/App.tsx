import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { WelcomePage } from './pages/welcomepage/WelcomePage';
import { Boards } from './pages/boards/Boards';
import { NotFound } from './pages/notfound/NotFound';

import './App.scss';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="boards" element={<Boards />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export { App };
