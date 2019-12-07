'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const loginbutton = document.getElementById('loginbutton');
const logoutbutton = document.getElementById('logoutbutton');
const uluserinfo = document.getElementById('userinfolist');  //select ul element in index.html
const ul = document.getElementById('mydogslist');  //select ul element in index.html
const breed = document.getElementById('breed');
const deleteButton = document.getElementById('deleteButton');
const modifyButton = document.getElementById('deleteButton');
const modifydiv = document.getElementById('modifydiv');
let giveusername;
let givedogid;
const ulform = document.getElementById('doglist');  //select ul element in index.html
const breedList = document.querySelectorAll('.breed-list');
const userList = document.querySelectorAll('.users-list');
const size = document.getElementById('size');
const addPostForm = document.getElementById('addPostForm');


//Get's the user token from the login or register page
let userinfo = sessionStorage.getItem("token");
console.log('user token?', userinfo);

//fetch the logged in user's info from database
const getUser = async () => {
    try {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/user/', options);
        console.log('before', response.body);
        const user = await response.json();
                         //  const userString = await JSON.stringify(response);
        console.log('after', user);
        //Show's the logged in user's info in the profile panel
        uluserinfo.innerHTML += `
      <li>
      <h3>${user.username}</h3>
      <p>${user.email}</p>
      </li>
      `
        giveusername = user.username; //logged in user's username is passed outside the getUser() function,
                                        //so that it's able to be used on the getDog() fuction below
    }
    catch (e) {
        console.log(e.message);
    };
   // return user.username;
};
getUser();

//build ul list elements of the logged in users posts
const getDog = async () => {
    try {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/dog', options);    //fetch all the dogs from the database
        const dogs = await response.json();
        dogs.forEach(async (dog) => {
               if (dog.owner === giveusername) {         //if the dog's owner matches to the logged in user > show it on the userpage
                   //    const breed = await getBreed(dog.breed);

                   ul.innerHTML += `
      <li>
      <a href="deletepost.html?id=${dog.id}"> <button id="deletepost${dog.id}">Delete post</button></a>
          <h2>${dog.name}</h2>
          <figure>
              <img src="${url}/${dog.filename}" class="resp">
          </figure>
          <p>Age: ${dog.age}</p>
          <p>Size: ${dog.breed}</p>
          <p>Owner: ${dog.owner}</p>
          <p>Location: ${dog.location}</p>
          <a href="dog.html?id=${dog.id}"><h2>GO TO PAGE</h2></a>
      </li>
      `
                /**   const button = document.getElementById('deletepost' + dog.id);
                   console.log('made this ', button);/   button.addEventListener('click', async (evt) => {
                       console.log('Eventlistener created for', button);
                       evt.preventDefault();
                       //const fd = new FormData(deleteUserForm);
                       const fetchOptions = {
                           method: 'DELETE',
                           headers: {
                               'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                           },
                           //  body: fd,
                       };
                       //if user delete success, remove the session token, alert the user and redirect to the index.html
                       //if error when deleting (mostly happens if user has post's, alerts user and redirects to the userpage.html
                       try {
                           console.log("Im trying to delete dog with id: ", dog.id);
                           const response = await fetch(url + '/dog/' + dog.id, fetchOptions);
                           const json = await response.json();
                           console.log('postdelete response', json);
                           //   sessionStorage.removeItem('token');
                           window.location.replace('userpage.html');
                           window.alert('Post has been deleted.');
                       } catch (e) {
                           window.alert('Something went wrong!');
                           window.location.replace('userpage.html');
                       }
                   });*/

               };
            //givedogid = dog.id;
        });
    } catch (e) {
        console.log(e.message);
    };
};
getDog();


logoutbutton.addEventListener('click', async (evt) => {
    evt.preventDefault();
    try {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/auth/logout', options);
        const json = await response.json();
        console.log(json);
        // remove token
        sessionStorage.removeItem('token');
        alert('You have been logged out. See you next time!');
        // show/hide forms + cats
        logoutbutton.style.display = 'none';
        loginbutton.style.display = 'block';
        window.location.replace('index.html');
    }
    catch (e) {
        console.log(e.message);
    }
});

//create a post form

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
    window.alert('Post created.');
    window.location.replace('userpage.html');
    // getDog();
});




//function to open the create a post form
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
//close form
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

logoutbutton.style.display = 'none';
if (sessionStorage.getItem('token')) {
    loginbutton.style.display = 'none';
    logoutbutton.style.display = 'block';
}