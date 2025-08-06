import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
};

type PopularBooksProps = {
  books: Book[];
};

export const PopularBooks: React.FC<PopularBooksProps> = ({ books }) => {
  return (
    <div className="space-y-4">
      {/* Header with title and controls */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Popular</h2>
        <div className="flex items-center space-x-2">
          <button className="text-amber-600 hover:text-amber-800 text-sm transition-colors">
            View All
          </button>
          <div className="flex space-x-1">
            <button className="hover:bg-gray-100 p-1 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="hover:bg-gray-100 p-1 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Books grid */}
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {books.map((book) => (
          <div key={book.id} className="space-y-2">
            {/* Book cover placeholder - replace with actual image */}
            <div className="flex justify-center items-center bg-gray-100 rounded-lg aspect-[2/3]">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="rounded-lg w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">📖</span>
              )}
            </div>
            <div>
              <h3 className="font-medium text-amber-900 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
