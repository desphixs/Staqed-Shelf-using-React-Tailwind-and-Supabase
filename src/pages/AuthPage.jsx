import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (loginError) throw loginError;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        <div className="p-10">
          <div className="flex flex-col items-center mb-10">
            <div className="mb-6">
              <img 
                src="https://cdn-icons-png.flaticon.com/128/495/495321.png" 
                alt="Shelf Logo" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Shelf
            </h1>
            <p className="text-slate-500 font-medium">
              {isSignUp ? "Join our reading community" : "Your personal digital library"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700 ml-1">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900 placeholder:text-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700 ml-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900 placeholder:text-slate-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-[13px] font-semibold border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A66206] hover:bg-[#8B5205] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#A66206]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                isSignUp ? "Sign Up" : "Log In"
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-slate-500 hover:text-[#A66206] font-bold text-sm transition-colors"
            >
              {isSignUp 
                ? "Already have an account? Log in" 
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
