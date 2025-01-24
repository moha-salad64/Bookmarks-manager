const form = document.getElementById('bookForm');
const booklist = document.getElementById('bookList')

//hold the data from input fields 
const bookNameField = document.getElementById('bookName');
const autherNameField = document.getElementById('authorName')
const descriptionField = document.getElementById('description')
const dateField = document.getElementById('date')

form.addEventListener('submit' , (event) =>{
    event.preventDefault();

    const bookName = bookNameField.value;
    const authorName = autherNameField.value;
    const description = descriptionField.value;
    const date = dateField.value;
    // console.log(bookName , authorName , description , date)

    async function loadData() {
        const response = await fetch('/api/books');
        const data = await response.json()
        booklist.innerHTML = data.map(book =>`
        <tr>
        <td>${book.bookName}</td>
        <td>${book.authorName}</td>
        <td>${book.description}</td>
        <td>${book.date}</td>
        <td>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
        <button class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        </td>
        </tr>`
        ).json('');
    }

    loadData();

})
