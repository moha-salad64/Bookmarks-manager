const form = document.getElementById('bookForm');
const booklist = document.getElementById('bookList');

// Hold the data from input fields
const bookNameField = document.getElementById('bookName');
const autherNameField = document.getElementById('authorName');
const descriptionField = document.getElementById('description');
const dateField = document.getElementById('date');

  //fetching books and display on the frontend
  const fetchBooks = async () =>{
    try {
      const response = await fetch('/api/book');
      const books = await response.json();
      console.log(books)
      booklist.innerHTML = books.map(book =>`
        <tr>
        <td>${book.bookName}</td>
        <td>${book.authorName}</td>
        <td>${book.description}</td>
        <td>${book.date}</td>
        <td>
        <button onclick="editBook('${book._id}' , '${book.bookName}' , '${book.authorName}' , '${book.description}' , '${book.date}')">Update</button>
        <button onclick="deleteBook('${book._id}')">delete</button>
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
        headers: {'Content-type':'application/json'},
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
    await fetch(`/api/book/${bookId}` , {method: 'DELETE'})
    fetchBooks();
}