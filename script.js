const maincont = document.getElementById("mainCont");

//add books catalog
const booksCatalog = document.createElement('h3');
booksCatalog.innerHTML = 'Books Catalog';
booksCatalog.setAttribute('class', 'booksCatalog');
maincont.append(booksCatalog);

const mainTitle = document.createElement("h1");
mainTitle.innerHTML = "Books are a uniquely portable magic.” – Stephen King";
mainTitle.setAttribute("class", "mainTitle");
maincont.append(mainTitle);

//create bookstore block
const books = document.createElement("div");
books.setAttribute("class", "books-block");
maincont.append(books);

async function getBooks() {
    const response = await fetch("./books.json");
    var data = await response.json();
    await layoutBooks(data);
}

function layoutBooks(data) {
    data.forEach((book, index, arr) => {
        //CARD
        const bookCont = document.createElement("div");
        bookCont.setAttribute("class", "book-card");
        books.appendChild(bookCont);

        //add img
        const img = document.createElement("img");
        img.setAttribute("class", "img");
        img.src = book.imageLink;
        img.alt = 'programming books';
        bookCont.appendChild(img);

        //add author
        const author = document.createElement("h3");
        author.setAttribute("class", "author");
        author.innerHTML = "Author: " + book.author;
        bookCont.appendChild(author);

        //add title
        const title = document.createElement("h4");
        title.setAttribute("class", "title");
        title.innerHTML = "title: " + book.title;
        bookCont.appendChild(title);

        //add price
        const price = document.createElement("h5");
        price.setAttribute("class", "price");
        price.innerHTML = "price: " + book.price;
        bookCont.appendChild(price);

        //add button
        const addButton = document.createElement("button");
        addButton.setAttribute("class", "addButton");
        addButton.innerHTML = "add";
        bookCont.appendChild(addButton);

        //add show more button
        const showButton = document.createElement("button");
        showButton.setAttribute("class", "showButton");
        showButton.innerHTML = "show more";
        bookCont.appendChild(showButton);

        //click on show more button
        showButton.addEventListener("click", () => {
            showButton.classList.add('hide');

            const modalCont = document.createElement("div");
            modalCont.classList.add("modal");
            bookCont.appendChild(modalCont);

            const descPara = document.createElement('p');
            descPara.classList.add('modal-desc');
            descPara.innerHTML = book.description;
            modalCont.appendChild(descPara);

            const modalBtn = document.createElement("button");
            modalBtn.classList.add("modal-btn");
            modalBtn.innerHTML = "show less";
            modalCont.appendChild(modalBtn);

            modalBtn.addEventListener('click', () => {
                modalCont.classList.add('hide');
                showButton.classList.remove('hide');
            })
        });

        addButton.addEventListener('click', () => {
            var cartDiv = document.createElement('div');
            cartDiv.setAttribute('class', 'cartDiv');
            var write = document.createElement('h4');
            write.innerHTML = book.title + '<br>' + '<br>' + book.author + '<br>' + '<br>' + book.price
            cartDiv.appendChild(write)
            maincont.append(cartDiv);
            addButton.disabled = true;
        })
    });

}

getBooks();