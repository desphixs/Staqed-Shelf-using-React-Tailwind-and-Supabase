import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import ShelfPage from "./pages/ShelfPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// Helper component to structure the app layout
const AppLayout = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">
        Loading Shelf...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <ShelfPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add" 
          element={
            <ProtectedRoute>
              <AddBookPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit/:id" 
          element={
            <ProtectedRoute>
              <EditBookPage />
            </ProtectedRoute>
          } 
        />

        {/* Redirect any unknown route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

import { Toaster } from 'sonner';

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <AuthProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;