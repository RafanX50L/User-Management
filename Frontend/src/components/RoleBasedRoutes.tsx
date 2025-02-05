import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';

// interface RoleBasedRouteProps {
//   allowedRoles: ('admin' | 'user')[];
// }

// const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
//   const { token, role } = useSelector((state: RootState) => state.auth);

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return allowedRoles.includes(role!) ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/unauthorized" replace />
//   );
// };

interface RoleBasedRouteProps {
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
  const { token , role } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};


export default RoleBasedRoute;