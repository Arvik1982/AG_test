import { Navigate, Outlet } from 'react-router-dom';

type protectedPropsType = {
  redirectPath?: string;
  isAllowed: boolean;
};

export const ProtectedRoute = ({ redirectPath = '/', isAllowed }: protectedPropsType) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace={true} />;
  }
  return <Outlet />;
};
