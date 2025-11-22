import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

// Define the component props, which include the element (the component to protect)
interface ProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isLoggedIn } = useAuth(); // Get the user's login status

  if (!isLoggedIn) {
    // If the user is NOT logged in, redirect them to the /login page
    return <Navigate to="/login" replace />;
  }

  // If the user IS logged in, render the intended component
  return element;
};

export default ProtectedRoute;