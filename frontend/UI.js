import BookService from "./services/BookService";
import { format } from 'timeago.js';
const bookService = new BookService();

const cargando = document.getElementById('cargando');

class UI {

    async renderBooks() {
        try {
            const books = await bookService.getBooks();
            if (books.messageError) {
                return this.renderMessage(books.messageError, 'danger');
            }
            // Loading
                cargando.classList.toggle('d-none');
            // Renderizar card
            const booksCardContainer = document.getElementById('books-cards');
            booksCardContainer.classList.toggle('d-none');
            booksCardContainer.innerHTML = '';
            books.forEach( book => {
                const div = document.createElement('div');
                div.className = '';
                div.innerHTML = `
                    <div class="card m-2">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${book.image_path}" alt="heroku borra las img" class="img-fluid" /> 
                            </div>
                            <div class="col-md-8">
                                <div class="card-block px-2">
                                    <h4 class="card-title">${book.title}</h4>
                                    <p class="card-text">${book.author}</p>
                                    <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            ${format(book.created_at)}
                        </div>
                    </div>
                `;
                booksCardContainer.appendChild(div);
            });
            if(books) { // Sacando el loading
                cargando.classList.toggle('d-none');
                booksCardContainer.classList.toggle('d-none');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async addNewBook(book) {
        try {
            const bookResponse = await bookService.postBook(book);
            if (bookResponse.messageError) {
                return this.renderMessage(bookResponse.messageError, 'danger')
            };
            this.clearBookForm();
            this.renderBooks();
            return this.renderMessage('Libro agregado correctamente', 'success');
        } catch (error) {
            console.error(error);
        }
    }

    clearBookForm() {
        document.getElementById('book-form').reset();
    }

    renderMessage(mensaje, colorMensaje) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMensaje} mensaje`;
        div.appendChild(document.createTextNode(mensaje));

        const divContainer = document.getElementById('formularioCard');
        const bookForm = document.getElementById('book-form');

        divContainer.insertBefore(div, bookForm);

        setTimeout(() => {
            document.querySelector('.mensaje').remove();
        }, 2500);
    }

    async deleteBook(bookId) {
        try {
            const bookResponse = await bookService.deleteBook(bookId);
            if (bookResponse.messageError) {
                return this.renderMessage(bookResponse.messageError, 'danger')
            };
            this.renderBooks();
            this.renderMessage('Libro eliminado', 'danger');
        } catch (error) {
            console.error(error);
        };
    }

}

export default UI;