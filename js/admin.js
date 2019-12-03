'use strict';

const getUsers = async () => {
  //const response = await fetch('/user/');
  //const users = await response.json();

    //mock data until I integrate the API
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
    ]
    console.log(users);

  for (const user of users) {
    console.log(user);
    const form = document.createElement("form")
    form.action = "/users/" + user.id;
    form.method = "DELETE"
    form.innerHTML = `
        <div>Username: ${user.name}</div>
        <div>Phone: ${user.phone}</div>
        <div>Email: ${user.email}</div>
        <button type="submit-button" class="delete">Delete</button>
    `;

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
    document.querySelector("input[name=username]").value = user.name;
    document.querySelector("input[name=phone]").value = user.phone;
    document.querySelector("input[name=email]").value = user.email;
}
