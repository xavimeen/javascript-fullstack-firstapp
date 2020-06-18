const { Router } = require('express');
const Book = require('../models/Book');
const { unlink } = require('fs-extra');
const router = Router();
const path = require('path');

router.get('/', async (req, res) => {
    const books = await Book.find()
    res.json(books);
});

router.post('/', async (req, res) => {
    const { title, author, isbn } = req.body;
    const image_path = `/uploads/${req.file.filename}`;
    const newBook = new Book({title, author, isbn, image_path});
    await newBook.save();
    res.json({message: "Book saved"});
});

router.delete('/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve(`./backend/public/${book.image_path}`));
    res.json({message: "Book deleted"});
});

module.exports = router;
