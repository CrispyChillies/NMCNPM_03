import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, roles, ...rest }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  const decodedToken: any = jwtDecode(token);
  const userRole = decodedToken.role;

  if (!roles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;