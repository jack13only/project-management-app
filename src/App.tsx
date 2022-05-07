import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { WelcomePage } from './pages/welcomepage/WelcomePage';

import './App.scss';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
      </Route>
    </Routes>
  );
};

export { App };
