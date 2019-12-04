'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const doginfo = document.getElementById('doginfo');  //select ul element in index.html
const userinfo = document.getElementById('userinfo');
const breedplace = document.querySelector('breed');
const ul = document.getElementById('mydogslist');  //select ul element in index.html
const breed = document.getElementById('breed');
//const size = document.getElementById('size');

const dogid = "14"; //CHANGE THIS TEXT TO MATCH THE USERNAME YOU WANT TO TEST NOW
//I.E. IF CHANGED TO "admin", WILL SHOW ADMINS INFO

//fetch user info from the database build profile ul element or users info
const getDog = async () => {
    const response = await fetch(url + '/dog/' + dogid);
    const dog = await response.json();
    //  const userpage = "OtherUser"; //currently variable is user -> select the user from db who's
    // username is admin. Once login is working, this should be changed to
    //const userid = loggedinsid -> if(user.id==userid) -> print the info
    //dogs.forEach( async (dog) => {
       // if(dog.id==dogid) {
            //const user = await getUser(dog.owner);
            //     const breed = await getBreed(dog.breed);
            document.getElementById('breed').innerHTML = dog.breed;
            document.getElementById('dog-name').innerHTML = dog.name;
            document.getElementById('dob').innerHTML = dog.dob;
            document.getElementById('location').innerHTML = dog.location;
            document.getElementById('img').src = "http://localhost:5500/" + dog.filename;
    ;
};

getDog();
/**
//build ul list element with dogs, fetch info from database
const getDog = async (id) => {
    const response = await fetch(url + '/dog' + id);
    const dog = await response.json();
    //  const ownerpage = "admin";
            const user = await getUser(dog.owner);
       //     const breed = await getBreed(dog.breed);

            breedplace.innerHTML += `${dog.breed}`;

            doginfo.innerHTML += `
      <li>
          <p>Breed type: ${dog.breed}</p>
            <p>Name: ${dog.name}</p>
            <p>Date of birth: ${dog.dob}</span></p>
            <p>Location: ${dog.location}</span></p>
            <button id="like">Like ❤️</button>
      </li>
      `
            userinfo.innerHTML += `
            <p>Name: ${dog.owner}</p>
            <p>Phone:</p>
            <p>Email:</span></p>
            <a  id="email">Send email 📧</a>
            <a  id="phone">Call owner 📞</a>
            `
};
getDog();

//get related breed
const getUser = async (id) => {
    const response = await fetch(url + '/user/' + id);
    const user = await response.json();
    return user;
};
getUser();

*/