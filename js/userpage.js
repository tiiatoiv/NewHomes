'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const uluserinfo = document.getElementById('userinfolist');  //select ul element in index.html
const username = document.getElementById('username');
const useremail = document.getElementById('useremail');

const ul = document.getElementById('mydogslist');  //select ul element in index.html
const breed = document.getElementById('breed');
const size = document.getElementById('size');

//const getBreed = ( () => {

//});

const getUser = async (id) => {
    const response = await fetch(url + '/user/' + id);
    const user = await response.json();
      //  const user = await getUser(dog.owner);
        uluserinfo.innerHTML += `
      <li>
          <h2>User: ${user.username}</h2>
          <p>Email: ${user.email}</p>
      </li>
      `;
    };

getUser();


//build ul element with dog attribute
const getDog = async () => {
    const response = await fetch(url + '/dog');
    const dogs = await response.json();
    const ownerpage = "randomuser";
    dogs.forEach( async (dog) => {
        if(dog.owner==ownerpage) {
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

/*const getUser = async () => {
  const response = await fetch(url + '/user/' + id);
  const user = await response.json();
  return user;
};*/
