import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/signup" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default RoleBasedRoute;
