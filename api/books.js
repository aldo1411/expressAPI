const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const booksPath = '././books.json'

const { getBooks, exist, modJson, deleteBook } = require('../../utils/booksUtils')


// Get all books
router.get('/', (req, res) => res.json(getBooks()))


// Get single book
router.get('/:id', (req, res) => {
    const books = getBooks()

    if (exist) {
        res.json(books.filter(book => book.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `No book with the id ${req.params.id}`})
    }
})

// create new book
router.post('/', (req, res) => {
    const books = getBooks()
    const newBook = {
        id: uuid.v4(),
        name: req.body.name,
        gender: req.body.gender,
        author: req.body.author,
        status: "available"
    }

    if (!req.body.name || !req.body.gender || !req.body.author) {
        return res.status(400).json( { msg: 'Please include name gender and author' })
    }

    books.push(newBook)
    modJson(books, '', booksPath)
    res.json({ msg: 'new book added', newbook: newBook })
})

// Update book
router.put('/:id', (req, res) => {
    const books = getBooks()
    if (exist) {
        const updBook = req.body
        books.forEach(book => {
            if (book.id === parseInt(req.params.id)) {
                book.name = updBook.name ? updBook.name : book.name
                book.gender = updBook.gender ? updBook.gender : book.gender
                book.author = updBook.author ? updBook.author : book.author

                modJson(books, '', booksPath)
                res.json({ msg: 'book updated', book })
            }
        })
    } else {
        res.status(400).json({ msg: `No book with the id ${req.params.id}`})
    }
})

// Delete book
router.delete('/:id', (req, res) => {
    if (exist) { 
        deleteBook(req.params.id)
        res.json( { msg: 'book deleted' })
    } else {
        res.status(400).json({ msg: `No book with the id ${req.params.id}`})
    }
})


module.exports = router