class BookService {
    
    constructor() {
        this.URI = '/api/books';
    }

    async getBooks() {
        try {
            const response = await fetch(this.URI);
            const books = await response.json();
            return books;
        } catch (error) {
            console.error(error);
            return {
                messageError: 'Ocurrió un error al intentar obtener los libros, inténtelo más tarde.'
            };
        };
    }

    async postBook(book) {
        try {
            const response = await fetch(this.URI, {
                method: 'POST',
                body: book
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            return {
                messageError: 'Ocurrió un error al intentar publicar el libro, inténtelo más tarde.'
            };
        };
    }

    async deleteBook(bookId) {
        try {
            const response = await fetch(`${this.URI}/${bookId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            return {
                messageError: 'Ocurrió un error al borrar el libro, inténtelo más tarde.'
            };
        };
    }

}

export default BookService;