import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGameGuard } from '../utils/hooks/useGameGuard';

export const GamePageGuard: FC<PropsWithChildren> = ({
  children,
}) => {
  const location = useLocation();
  const { loading, error } = useGameGuard();
  if (loading) return <div>loading game</div>;
  return error ? (
    <Navigate to="/games" state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};
