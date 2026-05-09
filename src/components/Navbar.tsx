import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { Plus, Power } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="h-20 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo & Title */}
      <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
        <img 
          src="https://cdn-icons-png.flaticon.com/128/495/495321.png" 
          alt="Shelf Logo" 
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform group-hover:scale-110"
        />
        <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Shelf
        </span>
      </Link>

      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-2 sm:gap-4">
        {user ? (
          <div className="flex items-center gap-3 sm:gap-6">
            <Link 
              to="/add" 
              className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#A66206] transition-colors"
            >
              <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Add Book</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-red-50 sm:bg-slate-50 hover:bg-red-50 text-red-600 sm:text-slate-600 hover:text-red-600 px-3 sm:px-4 py-2 rounded-xl transition-all font-bold text-sm"
            >
              <Power className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
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
