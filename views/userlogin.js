const form = document.getElementById('loginForm');

const userEmail = document.getElementById('useremail');
const userPassword = document.getElementById('loginpass');

console.log(userEmail)

form.addEventListener('submit' , (event) =>{
    event.preventDefault();
    const email = userEmai.value;
    const password = userPassword.value;

    console.log(email , password)
})