import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="h-20 bg-white border-b border-slate-100 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo & Title */}
      <Link to="/" className="flex items-center gap-3 group">
        <img 
          src="https://cdn-icons-png.flaticon.com/128/495/495321.png" 
          alt="Shelf Logo" 
          className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
        />
        <span className="text-2xl font-black text-slate-900 tracking-tight">
          Shelf
        </span>
      </Link>

      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-6">
            <Link 
              to="/add" 
              className="text-sm font-bold text-slate-600 hover:text-[#A66206] transition-colors"
            >
              Add Book
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 px-4 py-2 rounded-xl transition-all font-bold text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link 
              to="/auth" 
              className="text-sm font-bold text-slate-600 hover:text-[#A66206] px-4 py-2 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/auth" 
              className="bg-[#A66206] hover:bg-[#8B5205] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-[#A66206]/20 transition-all active:scale-95"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
