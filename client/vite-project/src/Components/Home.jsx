import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchAuthor, setSearchAuthor] = useState(""); // State for author search
  const [searchYear, setSearchYear] = useState(""); // State for year filter
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/books`);
      setBooks(response.data.books);
    }
    fetchBooks();
  }, []);

  // Filter books based on search criteria
  const filteredBooks = books.filter((book) => {
    const matchesAuthor = book.author.toLowerCase().includes(searchAuthor.toLowerCase());
    const matchesYear = searchYear ? book.year === searchYear : true;
    return matchesAuthor && matchesYear;
  });

  return (
    <div className="bg-gray-900 min-h-screen w-full text-white p-4">
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl font-bold text-center w-full">BOOKS</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition" onClick={() => {
          localStorage.removeItem('token');
          navigate('/');
        }}>
          Logout
        </button>
      </div>

      {/* Search Filters */}
      <div className="flex justify-center space-x-4 mt-6">
        <input
          type="text"
          placeholder="Search by author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
          className="p-2 border border-gray-600 bg-gray-800 rounded-md text-white focus:ring focus:ring-blue-500"
        />
        <select
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
          className="p-2 border border-gray-600 bg-gray-800 rounded-md text-white focus:ring focus:ring-blue-500"
        >
          <option value="">Filter by Year</option>
          {Array.from(new Set(books.map((book) => book.year))).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Books Container */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          return (
            <div
              key={book._id}
              className="bg-gray-800 cursor-pointer p-4 rounded-lg shadow-md hover:shadow-lg transition"
              onClick={() => {
                navigate(`/book/${book._id}`);
              }}
            >
              <div className='flex justify-center mb-4'>
                <img src={book.ImageURL} alt={book.title} className="w-32 h-48 object-cover rounded-md" />
              </div>
              <h1 className="text-center font-bold text-xl mb-2">{book.title}</h1>
              <h2 className="text-gray-400">Author: {book.author}</h2>
              <h3 className="text-gray-400">Published Year: {book.year}</h3>
              <p className='text-center mt-2 text-blue-400 underline'>Click for more details</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
