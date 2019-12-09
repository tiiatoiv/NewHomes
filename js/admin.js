'use strict';

const url = 'http://localhost:5500';

const getUsers = async () => {
  
    const fetchOptions = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
      };

  const response = await fetch(url + '/user/all', fetchOptions);
  const users = await response.json();
  console.log(users);

    /*mock data until I integrate the API
    const users = [
        {
            name: 'Boi',
            phone: '+358 40 578943',
            email: 'boi@metrpolia.fi',
            id: 0
        },
        {
            name: 'Balabi',
            phone: '+358 40 783783',
            email: 'balabi@metrpolia.fi',
            id: 1
        },
        {
            name: 'Lulu',
            phone: '+358 40 892103',
            email: 'lulu@metrpolia.fi',
            id: 2
        }
    ]*/
    

  for (const user of users) {
    console.log(user);
    const form = document.createElement("form")
    form.innerHTML = `
        <div>Username: ${user.username}</div>
        <div>Phone: ${user.phone}</div>
        <div>Email: ${user.email}</div>
        <button type="submit-button" class="delete">Delete</button>
    `;

    form.onsubmit = async event => {
        event.preventDefault();
        
        const fetchOptions = {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
          };
        console.log("deleteting user", user.id)
        try {
            const response = await fetch(url +  "/user/" + user.id, fetchOptions);
            const res = await response.json();
            console.log(res)
            location.reload();
        } catch(e) {
            console.log(e);
            return false
        }
        

        return false;
    }

    const edit = document.createElement("button")
    edit.innerHTML = "Modify"
    edit.className = "modify"
    edit.type = "button"
    edit.onclick = () => editUser(user);

    form.appendChild(edit)

    document.querySelector("section").appendChild(form);
  }
};

getUsers();

function editUser(user) {
    console.log(user);
    document.querySelector("aside").style.display = "block";
    document.querySelector("input[name=id]").value = user.id;
    document.querySelector("input[name=username]").value = user.username;
    document.querySelector("input[name=password]").value = "";
    document.querySelector("input[name=phone]").value = user.phone;
    document.querySelector("input[name=email]").value = user.email;

    document.getElementById("editform").onsubmit = async event => {
        event.preventDefault();

        const id = document.querySelector("input[name=id]").value;
        const username = document.querySelector("input[name=username]").value;
        const password = document.querySelector("input[name=password]").value;
        const phone = document.querySelector("input[name=phone]").value;
        const email = document.querySelector("input[name=email]").value;

        const modifiedUser = { id, username, password, phone, email };

        const fetchOptions = {
            method: 'PUT',
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(modifiedUser),
          };
        console.log("updating user", user.id)
        try {
            const response = await fetch(url +  "/user/" + user.id, fetchOptions);
            const res = await response.json();
            console.log(res)
            location.reload();
        } catch(e) {
            console.log(e);
            return false
        }

        return false;

    }
}
