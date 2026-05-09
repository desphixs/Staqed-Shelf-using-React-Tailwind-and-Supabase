import { Star, Edit2, Trash2, Power,  Plus } from "lucide-react";

export const StaticNavbar = ({ user, onSignOut, onNavigate, currentView }) => (
  <nav className="h-20 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50">
    <button onClick={() => onNavigate("shelf")} className="flex items-center gap-2 sm:gap-3 group shrink-0">
      <img 
        src="https://cdn-icons-png.flaticon.com/128/495/495321.png" 
        alt="Shelf Logo" 
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform group-hover:scale-110"
      />
      <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Shelf</span>
    </button>

    <div className="flex items-center gap-2 sm:gap-4">
      {user ? (
        <div className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={() => onNavigate("add")} 
            className={`flex items-center gap-2 text-sm font-bold transition-colors ${currentView === 'add' ? 'text-[#A66206]' : 'text-slate-600 hover:text-[#A66206]'}`}
          >
            <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add Book</span>
          </button>
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 bg-red-50 sm:bg-slate-50 hover:bg-red-50 text-red-600 sm:text-slate-600 hover:text-red-600 px-3 sm:px-4 py-2 rounded-xl transition-all font-bold text-sm"
          >
            <Power className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate("auth")} 
            className="text-sm font-bold text-slate-600 hover:text-[#A66206] px-4 py-2 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => onNavigate("auth")} 
            className="bg-[#A66206] hover:bg-[#8B5205] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-[#A66206]/20 transition-all active:scale-95"
          >
            Create Account
          </button>
        </div>
      )}
    </div>
  </nav>
);

export const StaticBookCard = ({ book, onDelete, onEdit }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "reading":
        return { label: "Reading", color: "bg-blue-100 text-blue-700 border-blue-200" };
      case "finished":
        return { label: "Finished", color: "bg-green-100 text-green-700 border-green-200" };
      default:
        return { label: "Want to Read", color: "bg-slate-100 text-slate-700 border-slate-200" };
    }
  };

  const badge = getStatusBadge(book.status);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col h-full relative group">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.color} inline-block`}>
          {badge.label}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(book)}
            className="p-2 bg-slate-50 text-slate-400 hover:text-[#A66206] hover:bg-orange-50 rounded-xl transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="p-2 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-black text-xl text-slate-900 leading-tight mb-1 line-clamp-2">{book.title}</h3>
        <p className="font-medium text-slate-500 text-sm line-clamp-1">{book.author || "Unknown Author"}</p>
      </div>

      <div className="flex-grow"></div>

      {book.notes && (
        <div className="mt-2 mb-6">
          <p className="text-sm text-slate-600 italic line-clamp-3 bg-slate-50 p-4 rounded-2xl relative">
            <span className="text-[#A66206] text-lg leading-none absolute top-3 left-3 opacity-50">"</span>
            <span className="pl-2">{book.notes}</span>
          </p>
        </div>
      )}

      <div className="flex items-center gap-1 mt-auto pt-4 border-t border-slate-100">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${star <= book.rating ? "fill-[#A66206] text-[#A66206]" : "fill-slate-100 text-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
};
