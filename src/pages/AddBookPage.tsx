import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Loader2, Star, BookOpen } from "lucide-react";
import { toast } from "sonner";

const AddBookPage = () => {
  // 1. Get the current user to attach to the book, and the navigator to redirect them later
  const { user } = useAuth();
  const navigate = useNavigate();

  // 2. Manage all form fields in a single state object
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    status: "want_to_read", // Default status
    rating: 0,
    notes: "",
  });

  // Track the loading state of the submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to update individual fields in the formData object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to handle the star rating clicks specifically
  const handleRating = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  // 3. Handle the final form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setIsSubmitting(true); // Start loading spinner

    try {
      // 4. Send the new book data to Supabase
      const { error } = await supabase.from("books").insert([
        {
          user_id: user.id, // CRITICAL: Link book to this specific user
          title: formData.title,
          author: formData.author,
          status: formData.status,
          rating: formData.rating > 0 ? formData.rating : null, // Send null if unrated
          notes: formData.notes,
        },
      ]);

      if (error) throw error;

      // 5. Show success message and redirect to the shelf
      toast.success("Book added to your shelf!");
      navigate("/");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book. Please try again.");
    } finally {
      setIsSubmitting(false); // Stop loading spinner
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
            <BookOpen className="w-6 h-6 text-[#A66206]" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Add New Book</h1>
            <p className="text-slate-500 font-medium mt-1">Catalog a new read for your collection.</p>
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
                  {/* Custom dropdown arrow */}
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
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto sm:px-12 bg-[#A66206] hover:bg-[#8B5205] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#A66206]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98] float-right"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Add Book to Shelf"
                )}
              </button>
              {/* Clearfix for the float */}
              <div className="clear-both"></div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
