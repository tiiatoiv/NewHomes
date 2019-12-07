'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const ul = document.getElementById('doglist');  //select ul element in index.html
const breedList = document.querySelectorAll('.breed-list');
const userList = document.querySelectorAll('.users-list');
const size = document.getElementById('size');
const addPostForm = document.getElementById('addPostForm');

//create options to select the breed on the form
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

// get all the breeds for form options from the database
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

//create options to select the user on the form
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

// set/fetch the only possible owner option on the form to be the currently logged in user
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

    //add event listener to the form > post info to the database when submitted
    //and create a new dog
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
    window.location.replace('userpage.html');
   // getDog();
});