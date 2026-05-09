import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Loader2, Star, BookOpen, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const EditBookPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    status: "want_to_read",
    rating: 0,
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        
        if (data) {
          setFormData({
            title: data.title || "",
            author: data.author || "",
            status: data.status || "want_to_read",
            rating: data.rating || 0,
            notes: data.notes || "",
          });
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        toast.error("Failed to load book data");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("books")
        .update({
          title: formData.title,
          author: formData.author,
          status: formData.status,
          rating: formData.rating > 0 ? formData.rating : null,
          notes: formData.notes,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("Book updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Failed to update book");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#A66206]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#A66206] font-bold mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shelf
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
              <BookOpen className="w-6 h-6 text-[#A66206]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Book</h1>
              <p className="text-slate-500 font-medium mt-1">Update your thoughts on this book.</p>
            </div>
          </div>
        </div>

        {/* The Form Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
            
            {/* Title & Author Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Book Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. The Hobbit"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Author</label>
                <input
                  type="text"
                  name="author"
                  placeholder="e.g. J.R.R. Tolkien"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Status & Rating Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Reading Status</label>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
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
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= formData.rating
                            ? "fill-[#A66206] text-[#A66206]"
                            : "fill-slate-200 text-slate-200 hover:fill-slate-300 hover:text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                  {formData.rating > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRating(0)}
                      className="ml-auto text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Personal Notes</label>
              <textarea
                name="notes"
                rows={4}
                placeholder="What did you think of the book? Any favorite quotes?"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent border-2 focus:bg-white focus:border-[#A66206] focus:outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-y"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link 
                to="/" 
                className="text-slate-400 hover:text-slate-600 font-bold transition-colors"
              >
                Cancel Changes
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#A66206] hover:bg-[#8B5205] text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-[#A66206]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Book Details"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;
