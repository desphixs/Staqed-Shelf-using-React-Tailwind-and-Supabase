import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { isSupabaseConfigured } from "./lib/supabase";
import StaticApp from "./static/StaticApp";
import AuthPage from "./pages/AuthPage";
import ShelfPage from "./pages/ShelfPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { Toaster } from 'sonner';

// The "Real" application logic using Supabase
const RealApp = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 font-sans">
          <Navbar />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      {/* If keys are missing, show the Static Demo. If keys exist, show the Real App. */}
      {isSupabaseConfigured ? <RealApp /> : <StaticApp />}
    </>
  );
}

export default App;