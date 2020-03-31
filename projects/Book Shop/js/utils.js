

function createBookUrl(books) {
    var counter = 0;
    var booksUrl = [];
    booksUrl.push('https://daitd.com/assets/materials/Hummus/dan%20alexander%20and%20co%20concept%20editing%20and%20design%20hakosem%20hummus%20book%20.jpg')
    booksUrl.push('https://www.zmanamitishop.co.il/Content/Images/uploaded/image1.jpeg')
    booksUrl.push('https://kali.training/wp-content/uploads/2017/06/kali-linux-revealed-book-mock-3.png')
    booksUrl.push('https://upload.wikimedia.org/wikipedia/he/thumb/0/04/2048book_cover.jpg/250px-2048book_cover.jpg')

    for (var i = 0; i < books.length; i++) {
        books[i].imgUrl = booksUrl[counter]
        counter++
        if (counter === 4) counter = 0;
    }
}

function createBookInformation(books) {
    var counter = 0;
    var booksInfo = []
    booksInfo.push('The book description is the pitch to the reader about why they should buy your book. When done right, it directly drives book sales.')
    booksInfo.push('Despite having a nice cover and receiving good reviews, it wasn’t selling as many')
    booksInfo.push('copies as it should have. So we dove into the book description, figured out the flaws.')
    booksInfo.push('Often the description is the factor that solidifies in the reader’s mind whether the book is for them or not.')


    for (var i = 0; i < books.length; i++) {
        books[i].description = booksInfo[counter]
        counter++
        if (counter === 4) counter = 0;
    }
}