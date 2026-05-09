import { Star } from "lucide-react";

const BookCard = ({ book }) => {
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

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col h-full relative group">
      
      {/* Top Section: Status Badge */}
      <div className="mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.color} inline-block`}>
          {badge.label}
        </span>
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
