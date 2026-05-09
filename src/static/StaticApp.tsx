import { useState, useEffect } from "react";
import { MOCK_BOOKS } from "./mockData";
import { StaticNavbar, StaticBookCard } from "./StaticComponents";
import { BookOpen, Loader2, Star, LibraryBig, Plus, ChevronLeft, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const StaticApp = () => {
  // --- STATE ---
  const [view, setView] = useState("auth"); // auth, shelf, add, edit
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("shelf_demo_books");
    return saved ? JSON.parse(saved) : MOCK_BOOKS;
  });
  const [editingBook, setEditingBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Persist books to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("shelf_demo_books", JSON.stringify(books));
  }, [books]);

  // --- ACTIONS ---
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setUser({ email: "demo@example.com", id: "demo-user" });
      setView("shelf");
      setIsLoading(false);
      toast.success("Welcome back!");
    }, 800);
  };

  const handleSignOut = () => {
    setUser(null);
    setView("auth");
    toast.info("Signed out");
  };

  const handleAddBook = (newBook) => {
    setIsLoading(true);
    setTimeout(() => {
      const book = { ...newBook, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() };
      setBooks([book, ...books]);
      setView("shelf");
      setIsLoading(false);
      toast.success("Book added to your shelf!");
    }, 600);
  };

  const handleUpdateBook = (updatedBook) => {
    setIsLoading(true);
    setTimeout(() => {
      setBooks(books.map(b => b.id === updatedBook.id ? updatedBook : b));
      setView("shelf");
      setEditingBook(null);
      setIsLoading(false);
      toast.success("Book updated!");
    }, 600);
  };

  const handleDeleteBook = (id) => {
    const book = books.find(b => b.id === id);
    if (window.confirm(`Are you sure you want to delete "${book?.title}"?`)) {
      setBooks(books.filter(b => b.id !== id));
      toast.success("Book removed from shelf");
    }
  };

  const startEditing = (book) => {
    setEditingBook(book);
    setView("edit");
  };

  // --- SUB-PAGES ---

  const AuthView = () => {
    const [authData, setAuthData] = useState({ email: "", password: "", fullName: "" });
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(e); // Both just "log in" for the demo
    };

    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 border border-slate-100">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/128/495/495321.png" className="w-10 h-10" alt="logo" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isRegistering ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              {isRegistering 
                ? "Join Shelf to start tracking your library." 
                : "Log in to manage your personal library."}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegistering && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 opacity-0" />
                  <input 
                    type="text" 
                    value={authData.fullName} 
                    onChange={e => setAuthData({...authData, fullName: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900" 
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  value={authData.email} 
                  onChange={e => setAuthData({...authData, email: e.target.value})}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  value={authData.password} 
                  onChange={e => setAuthData({...authData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900" 
                />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-[#A66206] hover:bg-[#8B5205] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#A66206]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : isRegistering ? "Create Account" : "Sign In"}
            </button>
            <p className="text-center text-sm font-medium text-slate-400">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
              <span 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-[#A66206] cursor-pointer hover:underline"
              >
                {isRegistering ? "Login" : "Register"}
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  };

  const ShelfView = () => {
    const [filter, setFilter] = useState("all");
    const filtered = books.filter(b => filter === "all" || b.status === filter);

    return (
      <div className="p-8 max-w-6xl mx-auto py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <LibraryBig className="w-10 h-10 text-[#A66206]" />
              My Shelf
            </h1>
            <p className="text-slate-500 font-medium mt-2">You have {books.length} {books.length === 1 ? 'book' : 'books'} in your collection.</p>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto hide-scrollbar">
            {[
              { id: "all", label: "All Books" },
              { id: "reading", label: "Reading" },
              { id: "want_to_read", label: "Want to Read" },
              { id: "finished", label: "Finished" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  filter === tab.id
                    ? "bg-[#A66206] text-white shadow-md shadow-[#A66206]/20"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(b => <StaticBookCard key={b.id} book={b} onDelete={handleDeleteBook} onEdit={startEditing} />)}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-sm flex flex-col items-center justify-center">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <LibraryBig className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Your shelf is empty!</h3>
            <p className="text-slate-500 font-medium mb-8 max-w-md">Add your first book to get started with your collection.</p>
            <button onClick={() => setView("add")} className="bg-[#A66206] hover:bg-[#8B5205] text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-[#A66206]/20 transition-all flex items-center gap-2 active:scale-95">
              <Plus className="w-5 h-5" /> Add Your First Book
            </button>
          </div>
        )}
      </div>
    );
  };

  const BookFormView = ({ isEdit = false }) => {
    const [data, setData] = useState(isEdit ? editingBook : { title: "", author: "", status: "want_to_read", rating: 0, notes: "" });

    const handleSubmit = (e) => {
      e.preventDefault();
      isEdit ? handleUpdateBook(data) : handleAddBook(data);
    };

    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setView("shelf")} className="inline-flex items-center gap-2 text-slate-500 hover:text-[#A66206] font-bold mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Shelf
          </button>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
              <BookOpen className="w-6 h-6 text-[#A66206]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{isEdit ? "Edit Book" : "Add New Book"}</h1>
              <p className="text-slate-500 font-medium mt-1">{isEdit ? "Update your thoughts on this book." : "Catalog a new read for your collection."}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Book Title *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. The Hobbit"
                    value={data.title} 
                    onChange={e => setData({...data, title: e.target.value})} 
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900 placeholder:text-slate-400" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Author</label>
                  <input 
                    type="text" 
                    placeholder="e.g. J.R.R. Tolkien"
                    value={data.author} 
                    onChange={e => setData({...data, author: e.target.value})} 
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900 placeholder:text-slate-400" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Reading Status</label>
                  <div className="relative">
                    <select 
                      value={data.status} 
                      onChange={e => setData({...data, status: e.target.value})} 
                      className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900 appearance-none cursor-pointer"
                    >
                      <option value="want_to_read">Want to Read</option>
                      <option value="reading">Currently Reading</option>
                      <option value="finished">Finished</option>
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 1.5L6 6L10.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Rating</label>
                  <div className="flex items-center gap-2 h-[52px] px-5 rounded-2xl bg-slate-50 border-transparent border-2 transition-all">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button key={s} type="button" onClick={() => setData({...data, rating: s})} className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
                        <Star className={`w-6 h-6 transition-colors ${s <= data.rating ? "fill-[#A66206] text-[#A66206]" : "fill-slate-200 text-slate-200 hover:fill-slate-300 hover:text-slate-300"}`} />
                      </button>
                    ))}
                    {data.rating > 0 && (
                      <button type="button" onClick={() => setData({...data, rating: 0})} className="ml-auto text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">Clear</button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Personal Notes</label>
                <textarea 
                  placeholder="What did you think of the book? Any favorite quotes?" 
                  rows={4}
                  value={data.notes} 
                  onChange={e => setData({...data, notes: e.target.value})} 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-y" 
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button type="submit" disabled={isLoading} className="w-full sm:w-auto sm:px-12 bg-[#A66206] hover:bg-[#8B5205] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#A66206]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98] float-right">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : isEdit ? "Update Book Details" : "Add Book to Shelf"}
                </button>
                <div className="clear-both"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <StaticNavbar user={user} onSignOut={handleSignOut} onNavigate={setView} currentView={view} />
      <main>
        {view === "auth" && <AuthView />}
        {view === "shelf" && <ShelfView />}
        {view === "add" && <BookFormView />}
        {view === "edit" && <BookFormView isEdit />}
      </main>
    </div>
  );
};

export default StaticApp;
