'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const ul = document.getElementById('doglist');  //select ul element in index.html
const breedList = document.querySelectorAll('.breed-list');
const userList = document.querySelectorAll('.users-list');
const size = document.getElementById('size');

//create option for select element
const createBreedOptions = (breeds) => {
    breedList.forEach((list) => {
        // clear list
        list.innerHTML = '';
        breeds.forEach((breed) => {
            // create options with DOM methods
            const option = document.createElement('option');
            option.innerHTML = breed.type;
            option.classList.add('light-border');
            list.appendChild(option);
        });
    });
};

// get breeds to form options
const getBreeds = async () => {
    try {
        const response = await fetch(url + '/breed');
        const breeds = await response.json();
        createBreedOptions(breeds);
    }
    catch (e) {
        console.log(e.message);
    }
};
getBreeds();


//create option for selecting user
const createUserOptions = (users) => {
    userList.forEach((list) => {
        // clear list
        list.innerHTML = '';
        users.forEach((user) => {
            // create options with DOM methods
            const option = document.createElement('option');
            option.innerHTML = user.username;
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

