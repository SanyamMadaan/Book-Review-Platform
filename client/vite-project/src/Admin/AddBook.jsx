import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [ImageURL, setImageURL] = useState(null);

  const navigate = useNavigate();

  const UploadFile = async () => {
    if (!ImageURL) {
      console.log('No image selected');
      return null;
    }
    const data = new FormData();
    data.append('file', ImageURL);
    data.append('upload_preset', 'images_preset');

    try {
      let cloudName = 'dv3vxqkwd';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  async function addBook(e) {
    e.preventDefault();
    const uploadedImageURL = await UploadFile();
    if (!uploadedImageURL) {
      alert('Error uploading Image');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/books/`,
        {
          title,
          author,
          year,
          ImageURL: uploadedImageURL,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (response.status === 200) {
        alert('Book added successfully!');
        navigate('/admin/dashboard');
        return;
      }
      alert('Error adding book!');
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      <form onSubmit={addBook} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Published Year"
          onChange={(e) => setYear(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageURL(e.target.files[0])}
          required
          className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}