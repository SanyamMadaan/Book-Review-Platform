import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/books`);
      setBooks(response.data.books);
    }
    fetchBooks();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  // Filter and search logic
  const filteredBooks = books.filter((book) => {
    const matchesSearchQuery =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilterYear = filterYear ? book.year === filterYear : true;

    return matchesSearchQuery && matchesFilterYear;
  });

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h1 className="text-3xl font-bold">ADMIN DASHBOARD</h1>
        <button className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-700" onClick={handleLogout}>Logout</button>
      </div>

      <button 
        className="mt-4 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={() => navigate('/addbook')}
      >
        ADD BOOK
      </button>

      {/* Search Bar */}
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 text-black w-full rounded-md"
        />
        
        {/* Filter by Year */}
        <select
          className="p-2 text-black rounded-md"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="">Filter by Year</option>
          {Array.from(new Set(books.map((book) => book.year))).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Books container */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} className="bg-gray-800 p-4 rounded-md">
              <img src={book.ImageURL} alt={book.title} className="w-full h-48 object-cover rounded-md" />
              <h2 className="mt-2 text-xl font-bold">{book.title}</h2>
              <h3 className="text-gray-400">Author: {book.author}</h3>
              <p className="text-gray-500">Published Year: {book.year}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No books found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}
