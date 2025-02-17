const express = require('express');
const router = express.Router();
const {Book} =require('../model');
const mongoose = require('mongoose');

router.get('/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        const book = await Book.findById(bookId).populate('reviews.user');

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ reviews: book.reviews });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params;
        const {comment } = req.body;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }


        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Add new review
        const newReview = { comment };
        book.reviews.push(newReview);
        await book.save();

        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
