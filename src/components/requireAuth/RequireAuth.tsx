import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { PATHS } from '../../shared/constants/routes';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { userToken } = useAppSelector((state) => state.authStorage);
  const location = useLocation();

  if (!userToken) {
    return <Navigate to={PATHS.main} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
