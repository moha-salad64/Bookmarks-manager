const form = document.getElementById('bookForm');
const booklist = document.getElementById('bookList');

// Hold the data from input fields
const bookNameField = document.getElementById('bookName');
const autherNameField = document.getElementById('authorName');
const descriptionField = document.getElementById('description');
const dateField = document.getElementById('date');

// Automatically display user information when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchBooks(); 
});


  const fetchBooks = async () =>{
    try {
      const response = await fetch('/api/book');
      const books = await response.json();
      console.log(books)
      booklist.innerHTML = books.map(book =>`
        <tr>
        <td class="p-2 border border-gray-600">${book.bookName}</td>
        <td class="p-2 border border-gray-600">${book.authorName}</td>
        <td class="p-2 border border-gray-600">${book.description}</td>
        <td class="p-2 border border-gray-600">${book.date}</td>
        <td class="p-2 border border-gray-600">
        <button class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600" onclick="deleteBook('${book._id}')">delete</button>
        <button class="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600" onclick="editBook('${book._id}' , '${book.bookName}' , '${book.authorName}' , '${book.description}' , '${book.date}')">Update</button>
        </td>
        </tr>`
      ).join('');
    } catch (error) {
      console.log('Error feching list of books' , error)
    }
  }

  let editBookId = null;
// Function to handle form submission for creating a new book
form.addEventListener('submit', async (event) => {
  event.preventDefault();

    bookName = bookNameField.value
    authorName = autherNameField.value
    description = descriptionField.value
    date = dateField.value

  if(editBookId){
    try {
      const response = await fetch(`api/book/${editBookId}`,{
        method: "put",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({bookName , authorName, description, date,}),
      })
      const result = await response.json();
      if(response.ok){
        alert(result.message || 'book updated successfully')
        editBookId = null
        fetchBooks();
      }else{
        alert(result.message || 'Failed book updated');
      }
    } catch (error) {
      console.log('error book updated' , error)
    }
  }
  else{
        try {
          const response = await fetch('/api/book' , {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({bookName , authorName , description, date})
          });
    
          const result = await response.json();
          console.log(result)
          if(response.ok){
            alert(result.message || 'book added successfully');
            // form.reset();
            fetchBooks();
          }
          else{
            alert(result.message || 'Failed to add books');
          }
        } catch (error) {
          console.log('error of adding book' , error);
        }
  }

    bookNameField.value = "";
    autherNameField.value ="";
    descriptionField.value ="";
    dateField.value = "";

});

//finction that pass input fields value to make update
async function editBook(bookid , bookName , authorName , description , date) {
  editBookId = bookid;
  document.getElementById('bookName').value = bookName;
  document.getElementById('authorName').value = authorName;
  document.getElementById('description').value = description;
  document.getElementById('date').value = date;
}

//delete function
async function deleteBook(bookId) {
  try {
    const response = await fetch(`/api/book/${bookId}` ,{method: 'DELETE'})

    const result = await response.json();
    if(response.ok){
      alert(result.message || 'Book was deleted');
      fetchBooks();
    }
    else{
      alert(result.message || 'Invalid book deleted');
    }
  } catch (error) {
    console.error("Error deleting book: " , error)
  }
   
}