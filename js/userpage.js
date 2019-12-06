'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const loginbutton = document.getElementById('loginbutton');
const logoutbutton = document.getElementById('logoutbutton');
const uluserinfo = document.getElementById('userinfolist');  //select ul element in index.html
const ul = document.getElementById('mydogslist');  //select ul element in index.html
const breed = document.getElementById('breed');
const deleteButton = document.getElementById('deleteButton');
const modifyButton = document.getElementById('deleteButton');
let giveusername;

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
      <li>
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
               };
        });
    } catch (e) {
        console.log(e.message);
    };
};
getDog();


logoutbutton.style.display = 'none';
if (sessionStorage.getItem('token')) {
    loginbutton.style.display = 'none';
    logoutbutton.style.display = 'block';
}