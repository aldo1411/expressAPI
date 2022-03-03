const fs = require('fs')
const booksPath = '././books.json'

const getBooks = () =>  {
    const rawData = fs.readFileSync(booksPath)
    const jsonData = JSON.parse(rawData)
    return jsonData
}

const exist = id =>{
    const books = getBooks(booksPath)
    const exist = books.some(book => book.id === id) 
    return exist
}

const modJson = (jsonData, message) =>{
    let data = JSON.stringify(jsonData, null, 2)
    fs.writeFile(booksPath, data, (err) =>{
        console.log(message)
    })
}

const deleteBook = id =>{
    const books = getBooks(booksPath)
    books.forEach((book, i) => {
        if (book.id === parseInt(id)) {
            books.splice(i, 1)
            modJson(books, '')
        }
    });
}
    
module.exports = {
    getBooks,
    exist,
    modJson,
    deleteBook
}