import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { PATHS } from '../../shared/constants/routes';

const RequireAuth = ({ children, needAuth }: { children: JSX.Element; needAuth: boolean }) => {
  const { userToken } = useAppSelector((state) => state.authStorage);
  const location = useLocation();

  const permission = needAuth ? !!userToken : !userToken;

  if (!permission) {
    return <Navigate to={PATHS.main} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
