import './styles/app.css';
import UI from './UI';

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.renderBooks();
})

document.getElementById('book-form')
    .addEventListener('submit', (e) => {
        e.preventDefault();

        const titulo = document.getElementById('title').value;
        const autor = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const imagen = document.getElementById('image').files;

        if(titulo && autor && isbn && imagen[0]) {
            const formData =  new FormData();
            formData.append('title', titulo);
            formData.append('author', autor);
            formData.append('isbn', isbn);
            formData.append('image', imagen[0]);
    
            ui.addNewBook(formData);
        } else {
            ui.renderMessage('Todos los campos tienen que estar completados.', 'danger');
        }

    });

document.getElementById('books-cards')
    .addEventListener('click', (e) => {
        e.preventDefault();
        
        if(e.target.classList.contains('delete')) {
            ui.deleteBook(e.target.getAttribute('_id'));
        }
    });