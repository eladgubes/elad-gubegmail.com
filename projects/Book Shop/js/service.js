'use strict'

const BOOKS_KEY = 'books'
var gBooks;
var gNextId;
var gBooksForDisplay = 5;


function createBook(name, price, imgUrl, description) {
    var book = {
        id: gNextId++,
        name: name,
        price: price,
        imgUrl: imgUrl,
        description: description,
        rate: 0
    }
    gBooks.unshift(book)
    saveBooksInStorage()
    return book
}

function saveBooksInStorage() {
    saveInStorage(BOOKS_KEY, gBooks)
}

function getBooksFromStorage() {
    gBooks = getFromStorage(BOOKS_KEY)
}

function getBooks(page) {
    var pageBooks = [];
    var startBooksIdx = (page - 1) * gBooksForDisplay;
    var endBooksIdx = page * gBooksForDisplay;
    if (endBooksIdx > gBooks.length - 1) endBooksIdx = gBooks.length - 1

    for (var i = startBooksIdx; i < endBooksIdx; i++) {
        pageBooks.push(gBooks[i])
    }
    return pageBooks
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(book => { return bookId === book.id })
    gBooks.splice(bookIdx, 1)
    saveBooksInStorage()
    getNextId()
}

function updateBook(bookId, bookPrice) {
    var bookIdx = gBooks.findIndex(book => { return bookId === book.id })
    gBooks[bookIdx].price = bookPrice
    saveBooksInStorage()
}

function isThereBooks(books) {
    if (!books || !books.length) return true
    return false
}

function setGlobal() {
    getBooksFromStorage()
    gNextId = (getNextId() > 0) ? getNextId() : 1
    if (!gBooks) gBooks = []
    else{
        createBookUrl(gBooks)
        createBookInformation(gBooks)
    }
}

function sortById() {
    gBooks.sort((aBook, bBook) => {
        return aBook.id - bBook.id
    })
}

function sortByPrice() {
    gBooks.sort((aBook, bBook) => {
        return aBook.price - bBook.price
    })
}

function sortByName() {
    gBooks.sort((aBook, bBook) => {
        if (aBook.name.toUpperCase() < bBook.name.toUpperCase()) return -1;
        if (aBook.name.toUpperCase() > bBook.name.toUpperCase()) return 1;
        return 0;
    })
}

function getNextId() {
    var idNumbers = gBooks.map(book => { return book.id });
    return Math.max(...idNumbers) + 1;
}

function readBookDetails(bookId) {
    var bookIdx = gBooks.findIndex(book => { return bookId === book.id });
    return gBooks[bookIdx];
}

function updateRateBook(bookId, rate) {
    var bookIdx = gBooks.findIndex(book => { return bookId === book.id });
    gBooks[bookIdx].rate += rate;
    if (gBooks[bookIdx].rate > 10) gBooks[bookIdx].rate = 10;
    if (gBooks[bookIdx].rate < 0) gBooks[bookIdx].rate = 0;

}

function getBooksForDisplay() {
    return gBooksForDisplay
}

function getBooksList() {
    return gBooks.length
}