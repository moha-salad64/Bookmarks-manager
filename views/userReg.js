const form = document.getElementById('registerForm');
const userList = document.getElementById('Userlist');

const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const userRole = document.getElementById('role');
const emailField = document.getElementById('email');

// Automatically display user information when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers(); 
  });

const fetchUsers = async() =>{
    try {
        const response = await fetch('/api/user');
        const users = await response.json();
        //create user list table
        userList.innerHTML = users.map(user =>`
            <tr>
            <td class="p-2 border border-gray-600">${user.username}</td>
            <td class="p-2 border border-gray-600">${user.password}</td>
            <td class="p-2 border border-gray-600">${user.email}</td>
            <td class="p-2 border border-gray-600">r${user.role}</td>
            <td class="p-2 border border-gray-600">
            <button class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600" onclick="deleteUser('${user._id}')">Delete</button>
            <button class="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600" onclick="userUpdate('${user._id}' , '${user.username}' , '${user.password}' , '${user.email}' , '${user.role}')">Update</button>
            </td>
            </tr>
            `).join('')
    } catch (error) {
        console.log('Error fetching users' , error)
    }
}

let userEdit = null;
form.addEventListener('submit' ,  async (event) =>{
    event.preventDefault();
    const username = usernameField.value
    const password = passwordField.value
    const role = userRole.value;
    const email = emailField.value || 'user';
    if(userEdit){
        try{
            const response = await fetch(`/api/user/${userEdit}`, {
                method: "put",
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({username , password , email , role}),
            })
            const result = await response.json();
            if(response.ok){
                alert(result.message || 'user updated successfully');
                userEdit = null;
                fetchUsers();
            }else{
                alert(result.message || 'user updated error')
            }
        }catch(error){
            console.log('user updated error' , error);
        }
    }
    else{
        try{
            const response = await fetch('/api/user' , {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username , password ,  email , role})
            });
            console.log(role);
            const result = await response.json();
            console.log(result)
            if(response.ok){
                alert(result.message || 'user created successfully');
                fetchUsers();
            }else{
                alert(result.message || 'failed user creation')
            }
        }catch(error){
            console.log('user creation error' , error)
        }
    }

    usernameField.value = "";
    passwordField.value = "";
    emailField.value ="";
    userRole.value = "";
})

async function userUpdate(userId , username , password , email , role) {
    userEdit = userId;
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
    document.getElementById('role').value = role;
    document.getElementById('email').value = email;
}

async function deleteUser(userId) {
    try {
        // const response = await fetch(`/api/book/${bookId}` ,{method: 'DELETE'})

        const response = await fetch(`/api/user/${userId}` , {method : 'DELETE'})
        const result = await response.json();
        if(response.ok){
            alert(result.message  || 'user deleted successfully');
            fetchUsers();
        }
        else{
            alert(result.message || 'user deleted failed');
        }
    } catch (error) {
        console.log('user deleted error' , error)
    }
   
}
