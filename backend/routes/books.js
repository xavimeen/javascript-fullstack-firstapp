const { Router } = require('express');
const Book = require('../models/Book');
const { unlink } = require('fs-extra'); // fs-extra soporta promesas, con unlink eliminaremos archivo
const router = Router();
const path = require('path');
const { exception } = require('console');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.log(error);
        res.json({
            messageError: 'Ocurrió un error al intentar obtener los libros, inténtelo más tarde'
        });
    }
});

router.post('/', async (req, res) => {
    const { title, author, isbn } = req.body;
    const image_path = `/uploads/${req.file.filename}`;
    try {
        const newBook = new Book({title, author, isbn, image_path});
        await newBook.save();
        res.json({
            messageSuccess: "Libro guardado correctamente"
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            messageError: 'Ocurrió un error al crear el libro, inténtelo más tarde'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        unlink(path.resolve(`./backend/public/${book.image_path}`));
        res.json({
            messageSuccess: "Libro eliminado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.json({
            messageError: 'Ocurrió un error al borrar el libro, inténtelo más tarde'
        });
    }
});

module.exports = router;
