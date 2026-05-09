import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  // If the app is still checking if a user is logged in, show a simple loading state
  if (isLoading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Loading...</div>;
  }

  // If no user is logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If the user IS logged in, render the page they were trying to see
  return children;
};

export default ProtectedRoute;
