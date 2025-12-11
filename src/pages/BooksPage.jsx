import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import BookList from '../components/BookList';

const BooksPage = () => {
  const { books, loading, error } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = [...new Set(books.map(book => book.category))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = search === '' || 
                         book.title.toLowerCase().includes(search.toLowerCase()) ||
                         book.author.toLowerCase().includes(search.toLowerCase()) ||
                         book.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === '' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const searchSuggestions = search ? [
    ...books.filter(book => 
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 3),
    ...categories.filter(category => 
      category.toLowerCase().includes(search.toLowerCase())
    ).map(category => ({ isCategory: true, category }))
  ].slice(0, 5) : [];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Books</h1>
      
      <div className="mb-6">
        <div className="relative mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books or select category..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg className={`w-5 h-5 transition-transform ${showSuggestions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1 max-h-80 overflow-y-auto">
              <div className="p-2 bg-gray-50 border-b border-gray-200">
                <div className="text-sm font-semibold text-gray-700">📚 Categories</div>
              </div>
              <div
                className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 flex items-center justify-between"
                onClick={() => {
                  setSelectedCategory('');
                  setSearch('');
                  setShowSuggestions(false);
                }}
              >
                <div>
                  <div className="font-semibold text-gray-800">All Categories</div>
                  <div className="text-sm text-gray-500">{books.length} books</div>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              {categories.map(category => (
                <div
                  key={category}
                  className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 flex items-center justify-between"
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearch('');
                    setShowSuggestions(false);
                  }}
                >
                  <div>
                    <div className="font-semibold text-gray-800">{category}</div>
                    <div className="text-sm text-gray-500">{books.filter(b => b.category === category).length} books</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
              
              {search && searchSuggestions.filter(item => !item.isCategory).length > 0 && (
                <>
                  <div className="p-2 bg-gray-50 border-b border-gray-200">
                    <div className="text-sm font-semibold text-gray-700">📖 Books</div>
                  </div>
                  {searchSuggestions.filter(item => !item.isCategory).map(book => (
                    <div
                      key={book._id}
                      className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setSearch(book.title);
                        setShowSuggestions(false);
                      }}
                    >
                      <div className="font-semibold text-gray-800">{book.title}</div>
                      <div className="text-sm text-gray-600">by {book.author} • {book.category}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
        

      </div>
      
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <BookList books={filteredBooks.slice(0, 12)} />
    </div>
  );
};

export default BooksPage;
