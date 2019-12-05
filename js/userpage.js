'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const uluserinfo = document.getElementById('userinfolist');  //select ul element in index.html
const ul = document.getElementById('mydogslist');  //select ul element in index.html
const breed = document.getElementById('breed');
let giveusername;


let userinfo = sessionStorage.getItem("token");
console.log('user token?', userinfo);
//fetch user info from server

/**
const getUser = async () => {
    try {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/user', options);
        const users = await response.json();
        users.forEach(async (user) => {
            if (user.username == userinfo.id) {
                //const user = await getUser(dog.owner);
                //     const breed = await getBreed(dog.breed);
                uluserinfo.innerHTML += `
      <li>
          <h2>${user.username}</h2>

          <p>Email: ${user.email}</p>
      </li>
      `
            }
            ;
        });
    } catch (e) {
        console.log(e.message);
    }
    ;
};
getUser();
*/

const getUser = async () => {
    try {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/user/', options); //
        console.log('before', response.body);
        const user = await response.json();
                         //  const userString = await JSON.stringify(response);
        console.log('after', user);
        uluserinfo.innerHTML += `
      <li>
      <h3>${user.username}</h3>
      <p>${user.email}</p>
      </li>
      `
        giveusername = user.username;
    }
    catch (e) {
        console.log(e.message);
    };
    return user.username;
};
getUser();

/**
//fetch user info from the database build profile ul element or users info
const getUser = async () => {
    const response = await fetch(url + '/user');
    const users = await response.json();
  //  const userpage = "OtherUser"; //currently variable is user -> select the user from db who's
                            // username is admin. Once login is working, this should be changed to
                            //const userid = loggedinsid -> if(user.id==userid) -> print the info
    users.forEach( async (user) => {
        if(user.username==userpage) {
            //const user = await getUser(dog.owner);
            //     const breed = await getBreed(dog.breed);
            uluserinfo.innerHTML += `
      <li>
          <h2>${user.username}</h2>

          <p>Email: ${user.email}</p>
      </li>
      `};
    })
};
getUser();

*/

//build ul list element with dogs, fetch info from database
const getDog = async () => {
    try {
        const options = {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/dog', options);
        const dogs = await response.json();

        //  const ownerpage = "admin";
        dogs.forEach(async (dog) => {
               if (dog.owner === giveusername) {
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
          <a href="../html/testdog.html"><h2>GO TO PAGE</h2></a>
      </li>
      `
               };
        });
    } catch (e) {
        console.log(e.message);
    };
};
getDog();

