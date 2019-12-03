/**'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const addForm = document.querySelector('#addDogForm');
const ul = document.querySelector('ul');
const userLists = document.querySelectorAll('.add-owner');



// submit add dog form
addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(addForm);
    const fetchOptions = {
        method: 'POST',
        body: fd,
    };
    //const response = await fetch(url + '/index', fetchOptions);
   // const json = await response.json();
    //console.log('add response', json);
    //getDog();
});*/

'use strict';
const url = 'http://localhost:5500'; // change url when uploading to server
const addForm = document.getElementById('addDogForm');
const userLists = document.querySelectorAll('.add-owner');

const ul = document.querySelector('ul');

const createUserOptions = (users) => {
    userLists.forEach((list) => {
        // clear user list
        list.innerHTML = '';
        users.forEach((user) => {
            // create options with DOM methods
            const option = document.createElement('option');
            option.value = user.id;
            option.innerHTML = user.name;
            option.classList.add('light-border');
            list.appendChild(option);
        });
    });
};

// get users to form options
const getUsers = async () => {
    try {
        const response = await fetch(url + '/user');
        const users = await response.json();
        createUserOptions(users);
    }
    catch (e) {
        console.log(e.message);
    }
};
getUsers();

// submit add dog form
addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(addForm);
    const fetchOptions = {
        method: 'POST',
        body: fd,
    };
    const response = await fetch(url + '/index', fetchOptions);
    const json = await response.json();
    console.log('add response', json);
    getDog();
});