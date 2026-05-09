import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

// A small helper component to handle the logic
const AppRoutes = () => {
  const { user, isLoading } = useAuth();

  // 1. If we are still checking if the user is logged in, show nothing or a spinner
  if (isLoading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Loading...</div>;
  }

  return (
    <Routes>
      {/* 2. If logged in, /auth redirects to / */}
      <Route 
        path="/auth" 
        element={user ? <Navigate to="/" replace /> : <AuthPage />} 
      />
      
      {/* 3. If NOT logged in, / redirects to /auth */}
      <Route 
        path="/" 
        element={user ? <HomePage /> : <Navigate to="/auth" replace />} 
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;