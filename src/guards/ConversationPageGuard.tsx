import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useConversationGuard } from '../utils/hooks/useConversationGuard';

export const ConversationPageGuard: FC<PropsWithChildren> = ({
  children,
}) => {
  const location = useLocation();
  const { loading, error } = useConversationGuard();
  if (loading) return <div>loading conversation</div>;
  return error ? (
    <Navigate to="/conversations" state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};
