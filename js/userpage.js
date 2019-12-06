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
    return user.username;
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
      <li><button id="deletepost${dog.id}">Delete post</button>
          <h2>${dog.name}</h2>
          <figure>
              <img src="${url}/${dog.filename}" class="resp">
          </figure>
          <p>Age: ${dog.age}</p>
          <p>Size: ${dog.breed}</p>
          <p>Owner: ${dog.owner}</p>
          <p>Location: ${dog.location}</p>
          <a href="../html/dog.html"><h2>GO TO PAGE</h2></a>
      </li>
      `
                   //console.log('Button id created:', button.id);
                   const button = document.getElementById('deletepost' + dog.id);
                   console.log('made this ', button);
                   button.addEventListener('click', async (evt) => {
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
                   });

               };
               //givedogid = dog.id;
        });
    } catch (e) {
        console.log(e.message);
    };
};
getDog();



modifydiv.style.display = 'none';
logoutbutton.style.display = 'none';
if (sessionStorage.getItem('token')) {
    loginbutton.style.display = 'none';
    logoutbutton.style.display = 'block';
}