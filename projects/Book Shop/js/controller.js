'use strict'


function onInit() {
    _hideModal()
    setGlobal()
    setPages()
    renderTable();
}

function renderTable() {
    var currPage = document.querySelector('.current').innerText
    var books = getBooks(currPage)
    var tableHTML = ''

    if (checkEmpty(books)) {
        tableHTML = 'There are no books'
        document.querySelector('.book-table').innerHTML = tableHTML
        return
    }

    tableHTML = `<table><thead><tr><th class="head-sort" onclick="onIdSort()">Id</th>
    <th class="head-sort" onclick="onNameSort()">Name</th>
    <th class="head-sort" onclick="onPriceSort()">Price</th>
    <th>rate</th><th colspan="3">Action</th></tr></thead><tbody>`
    books.map(book => {
        tableHTML += `<tr><td>${book.id}</td><td>${book.name}</td><td>${book.price}</td>
        <td><button class="rate-btn" onclick="onRateBook(${book.id},1)">+</button>${book.rate}
        <button class="rate-btn" onclick="onRateBook(${book.id},-1)">-</button></td>
        <td><button class"action read" onclick="onReadBook(${book.id})">Read</button></td>
        <td><button class"action update" onclick="onOpenUpdateBook(${book.id})">Update</button></td>
        <td><button class"action delete" onclick="onOpenDeleteBook(${book.id})">Delete</button></td></tr>`

    })

    tableHTML += `</tbody></table>`
    document.querySelector('.book-table').innerHTML = tableHTML
}

function onAddBook() {
    var bookName = document.querySelector('.book-name').value
    var bookPrice = document.querySelector('.price').value
    var bookImageUrl = document.querySelector('.image-url').value
    var bookDescription = document.querySelector('.description').value

    if (!bookName || !bookPrice || !bookImageUrl || !bookDescription) {
        document.querySelector('.input-Indication').innerText = 'Please enter all the details'
        return
    }

    createBook(bookName, bookPrice, bookImageUrl, bookDescription)
    _hideModal()
    renderTable()
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    _hideModal()
    renderTable();
}

function onOpenDeleteBook(bookId){
    var modalHTML = `<h3>Are you sure you want to delete?
    <button onclick="onDeleteBook(${bookId})">DELETE</button>
    <button onclick="onCloseModal()">close</button>`
    _openModel(modalHTML)
}

function onOpenUpdateBook(bookId) {
    var modalHTML = `<input type="number" class="price" placeholder="Price"></input>
    <button onclick="onUpdateBook(${bookId})">UPDATE</button>
    <button onclick="onCloseModal()">close</button>`
    _openModel(modalHTML)
}

function onUpdateBook(bookId) {
    var bookPrice = document.querySelector('.price').value
    updateBook(bookId, bookPrice);
    renderTable();
    _hideModal()
}

function checkEmpty(books) {
    return isThereBooks(books);
}

function onIdSort() {
    sortById();
    renderTable();
}
function onNameSort() {
    sortByName();
    renderTable();
}
function onPriceSort() {
    sortByPrice();
    renderTable();
}
function onReadBook(bookId) {

    var book = readBookDetails(bookId);
    var modalHTML = `<h4>${book.name}</h4><img src="${book.imgUrl}"><P>${book.description}</P>
    <h5>the rate ${book.rate}</h5><button onclick="onCloseModal()">close</button>`
    _openModel(modalHTML)
}

function onCloseModal() {
    _hideModal()
}

function onRateBook(bookId, rate) {
    updateRateBook(bookId, rate)
    renderTable()
}

function onOpenBookMenu() {
    var addBookMenuHTML = `<input type="text" class="book-name" placeholder="Book name">
    <input type="number" class="price" placeholder="Price">
    <input type="url" class="image-url" placeholder="Image URL">
    <input type="text" class="description" placeholder="Description">
    <button onclick="onAddBook()">SUBMIT</button>
    <h2 class="input-Indication"></h2>
    <button onclick="onCloseModal()">close</button>`
    _openModel(addBookMenuHTML)
}

function setPages(page = 1) {

    var BooksForDisplay = getBooksForDisplay()
    var booksList = getBooksList()
    var PageLimit = Math.ceil(booksList / BooksForDisplay)

    if (page === 0 || page > PageLimit) return

    document.querySelector('.current').innerText = page
    document.querySelector('.last').innerText = (page === 1) ? '' : page - 1
    document.querySelector('.next').innerText = (page === PageLimit) ? '' : page + 1

}

function onPageSet(pageDiff) {
    var currPage = Number(document.querySelector('.current').innerText)
    currPage += pageDiff
    setPages(currPage)
    renderTable()
}


function _openModel(modalHTML){
    var elModal = document.querySelector('.modal')
    elModal.innerHTML = modalHTML
    elModal.hidden = false
}

function _hideModal(){
    var elModal = document.querySelector('.modal')
    elModal.hidden = true
}