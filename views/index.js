const form = document.getElementById('bookForm');
const booklist = document.getElementById('bookList');

// Hold the data from input fields
const bookNameField = document.getElementById('bookName');
const autherNameField = document.getElementById('authorName');
const descriptionField = document.getElementById('description');
const dateField = document.getElementById('date');

// Function to load all books and display them in the table
async function loadData() {
  try {
    const response = await fetch('/api/books'); // Fetch books from backend
    const data = await response.json();
    booklist.innerHTML = data
      .map(
        (book) => `
        <tr>
          <td class="p-2 border">${book.bookName}</td>
          <td class="p-2 border">${book.authorName}</td>
          <td class="p-2 border">${book.description}</td>
          <td class="p-2 border">${book.date}</td>
          <td class="p-2 border">
            <button class="bg-blue-500 text-white px-4 py-2 rounded" onclick="updateBook('${book._id}')">Update</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="deleteBook('${book._id}')">Delete</button>
          </td>
        </tr>`
      )
      .join('');
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Function to handle form submission for creating a new book
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const newBook = {
    bookName: bookNameField.value,
    authorName: autherNameField.value,
    description: descriptionField.value,
    date: dateField.value,
  };

  try {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
      alert('Book added successfully!');
      form.reset();
      loadData();
    } else {
      console.error('Error adding book:', await response.json());
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Function to delete a book by ID
async function deleteBook(bookId) {
  if (confirm('Are you sure you want to delete this book?')) {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Book deleted successfully!');
        loadData();
      } else {
        console.error('Error deleting book:', await response.json());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Function to update a book (opens a prompt to enter new values)
async function updateBook(bookId) {
  const bookName = prompt('Enter new book name:');
  const authorName = prompt('Enter new author name:');
  const description = prompt('Enter new description:');
  const date = prompt('Enter new date (YYYY-MM-DD):');

  if (bookName && authorName && description && date) {
    const updatedBook = { bookName, authorName, description, date };

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        alert('Book updated successfully!');
        loadData();
      } else {
        console.error('Error updating book:', await response.json());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Initial data load
loadData();
