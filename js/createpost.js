'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const ul = document.getElementById('doglist');  //select ul element in index.html
const breedList = document.querySelectorAll('.breed-list');
const userList = document.querySelectorAll('.users-list');
const size = document.getElementById('size');
const addPostForm = document.getElementById('addPostForm');

//create options to select the breed
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
        const options = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        try {
            const response = await fetch(url + '/breed', options);
            const breeds = await response.json();
            createBreedOptions(breeds);
        } catch (e) {
            console.log(e.message);
        }
        ;

    } catch (e) {
        console.log(e.message);
    }
};
getBreeds();


//create options to select the user
    const createUserOptions = (user) => {
        userList.forEach((list) => {
            // clear list
            list.innerHTML = '';
           // users.forEach((user) => {
                // create options with DOM methods
                const option = document.createElement('option');
                option.innerHTML = user.username;
                option.classList.add('light-border');
                list.appendChild(option);
            });
    };

// get users to form options
    const getUsers = async () => {
        try {
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            try {
                const response = await fetch(url + '/user', options);
                const user = await response.json();
                createUserOptions(user);
            } catch (e) {
                console.log(e.message);
            }
            ;
        } catch (e) {
            console.log(e.message);
        }
        ;
    };
    getUsers();
/**
//asign event to submit button
addPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = serializeJson(addPostForm);
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: JSON.stringify(data), //body data type must match "Content-Type" header
        };
        console.log(fetchOptions);
        const response = await fetch(url + '/dog', fetchOptions);
        const json = await response.json();
        console.log('added post', json);
        getDog();
        // save token
});*/

addPostForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(addPostForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd,
    };
    const response = await fetch(url + '/dog', fetchOptions);
    const json = await response.json();
    console.log('add response', json);
   // getDog();
});