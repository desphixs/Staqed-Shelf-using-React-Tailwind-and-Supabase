import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import BookCard from "../components/BookCard";
import { Loader2, LibraryBig, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ShelfPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Fetch books on page load
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase
          .from("books")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBooks(data || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to load your shelf. Please refresh.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on selected tab
  const filteredBooks = books.filter((book) => {
    if (filter === "all") return true;
    return book.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <LibraryBig className="w-10 h-10 text-[#A66206]" />
              My Shelf
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              You have {books.length} {books.length === 1 ? "book" : "books"} in your collection.
            </p>
          </div>

          {/* Filter Buttons */}
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

        {/* Content Area */}
        {isLoading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#A66206]" />
            <p className="font-bold">Dusting off your shelves...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          // Book Grid (The "Shelf")
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-sm flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <LibraryBig className="w-10 h-10 text-slate-300" />
            </div>
            {filter === "all" ? (
              <>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Your shelf is empty!</h3>
                <p className="text-slate-500 font-medium mb-8 max-w-md">
                  Looks like you haven't added any books to your collection yet. Let's fix that!
                </p>
                <Link
                  to="/add"
                  className="bg-[#A66206] hover:bg-[#8B5205] text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-[#A66206]/20 transition-all flex items-center gap-2 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Book
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-xl font-black text-slate-900 mb-2">No books found</h3>
                <p className="text-slate-500 font-medium">
                  You don't have any books with this status.
                </p>
                <button 
                  onClick={() => setFilter('all')}
                  className="mt-6 text-[#A66206] font-bold hover:underline"
                >
                  View all books
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShelfPage;
