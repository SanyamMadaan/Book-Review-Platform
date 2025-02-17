import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [review, setReview] = useState("");
    const [allReviews, setAllReviews] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);

    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/books/${id}`);
                setBook(response.data.book);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        }
        fetchBook();
    }, [id]);

    useEffect(() => {
        async function fetchAllReviews() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/reviews/${id}`);
                setAllReviews(response.data.reviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        }
        fetchAllReviews();
    }, [id]);

    async function submitReview(e) {
        e.preventDefault();
        if (!review.trim()) {
            alert("Review cannot be empty!");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/reviews/${id}`, {
                comment: review,
                user: "65fabd...2f",
                rating: 5
            });
            if (response.status === 201) {
                alert("Review added successfully!");
                setAllReviews([...allReviews, response.data.review]);
                setReview("");
            }
        } catch (error) {
            alert("Error while submitting review");
            console.error("Error:", error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-4">Book Details</h1>
                <div className="border border-gray-700 p-4 rounded-lg">
                    {book.ImageURL && <img src={book.ImageURL} alt={book.title} className="w-full h-60 object-cover rounded-md" />}
                    <h2 className="text-xl font-semibold mt-3">{book.title}</h2>
                    <p className="text-gray-300">Author: {book.author}</p>
                    <p className="text-gray-400">Published Year: {book.year}</p>
                </div>

                <h2 className="text-lg font-semibold mt-5 border-b border-gray-700 pb-2">Reviews</h2>
                <div className="space-y-3 mt-3">
                    {allReviews.slice(0, showAllReviews ? allReviews.length : 3).map((rev, index) => (
                        <div key={index} className="bg-gray-700 p-3 rounded-md">
                            <p>{rev.comment}</p>
                        </div>
                    ))}
                </div>
                {allReviews.length > 3 && !showAllReviews && (
                    <button className="text-blue-400 hover:underline mt-3" onClick={() => setShowAllReviews(true)}>View all reviews</button>
                )}
                {showAllReviews && allReviews.length > 3 && (
                    <button className="text-red-400 hover:underline mt-3" onClick={() => setShowAllReviews(false)}>Hide reviews</button>
                )}

                <form onSubmit={submitReview} className="mt-5">
                    <textarea
                        className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-500"
                        placeholder="Post your review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md mt-2 hover:bg-blue-700 transition duration-200">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default BookDetail;