import { Star, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { useState } from "react";

const BookCard = ({ book, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Helper to determine badge color and text based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "reading":
        return { label: "Reading", color: "bg-blue-100 text-blue-700 border-blue-200" };
      case "finished":
        return { label: "Finished", color: "bg-green-100 text-green-700 border-green-200" };
      case "want_to_read":
      default:
        return { label: "Want to Read", color: "bg-slate-100 text-slate-700 border-slate-200" };
    }
  };

  const badge = getStatusBadge(book.status);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${book.title}"?`)) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase.from("books").delete().eq("id", book.id);
      if (error) throw error;

      toast.success("Book deleted successfully");
      onDelete(book.id); // Update local state in parent
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col h-full relative group">
      
      {/* Top Section: Status Badge & Actions */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.color} inline-block`}>
          {badge.label}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/edit/${book.id}`}
            className="p-2 bg-slate-50 text-slate-400 hover:text-[#A66206] hover:bg-orange-50 rounded-xl transition-all"
            title="Edit Book"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
            title="Delete Book"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title & Author */}
      <div className="mb-4">
        <h3 className="font-black text-xl text-slate-900 leading-tight mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="font-medium text-slate-500 text-sm line-clamp-1">
          {book.author || "Unknown Author"}
        </p>
      </div>

      {/* Spacer to push notes/rating to the bottom */}
      <div className="flex-grow"></div>

      {/* Middle Section: Notes Preview */}
      {book.notes && (
        <div className="mt-2 mb-6">
          <p className="text-sm text-slate-600 italic line-clamp-3 bg-slate-50 p-4 rounded-2xl relative">
            <span className="text-[#A66206] text-lg leading-none absolute top-3 left-3 opacity-50">"</span>
            <span className="pl-2">{book.notes}</span>
          </p>
        </div>
      )}

      {/* Bottom Section: Rating */}
      <div className="flex items-center gap-1 mt-auto pt-4 border-t border-slate-100">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              book.rating && star <= book.rating
                ? "fill-[#A66206] text-[#A66206]"
                : "fill-slate-100 text-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BookCard;

