'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const uluserinfo = document.getElementById('userinfolist');  //select ul element in index.html
//const username = document.getElementById('username');
//const useremail = document.getElementById('useremail');
const ul = document.getElementById('mydogslist');  //select ul element in index.html
const breed = document.getElementById('breed');
//const size = document.getElementById('size');

const userpage = "OtherUser"; //CHANGE THIS TEXT TO MATCH THE USERNAME YOU WANT TO TEST NOW
                                //I.E. IF CHANGED TO "admin", WILL SHOW ADMINS INFO

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

//build ul list element with dogs, fetch info from database
const getDog = async () => {
    const response = await fetch(url + '/dog');
    const dogs = await response.json();
  //  const ownerpage = "admin";
    dogs.forEach( async (dog) => {
        if(dog.owner==userpage) {
        //const user = await getUser(dog.owner);
        const breed = await getBreed(dog.breed);

        ul.innerHTML += `
      <li>
          <h2>${dog.name}</h2>
          <figure>
              <img src="${dog.filename}" class="resp">
          </figure>
          <p>Age: ${dog.age}</p>
          <p>Size: ${breed.size}</p>
          <p>Owner: ${dog.owner}</p>
          <p>Location: ${dog.location}</p>
      </li>
      `};
    })
};

//get related breed
const getBreed = async (id) => {
    const response = await fetch(url + '/breed/' + id);
    const breed = await response.json();
    return breed;
};
getDog();

