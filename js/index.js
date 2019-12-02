'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const ul = document.querySelector('ul');  //select ul element in index.html
const breed = document.getElementById('breed');
const size = document.getElementById('size');

const getBreed = ( () => {

});

const getDog = async () => {
    const response = await fetch(url + '/index');
    const dogs = await response.json();
    dogs.forEach( async (dog) => {
      const user = await getUser(dog.owner);
      ul.innerHTML += `
      <li>
          <h2>${dog.name}</h2>
          <figure>
              <img src="${dog.filename}" class="resp">
          </figure>
          <p>Dob: ${dog.dob}</p>
          <p>Location: ${dog.location}</p>
          <p>Owner: ${user.username}</p>
      </li>
      `;
    });
  };
  
  const getUser = async (id) => {
    const response = await fetch(url + '/user/' + id);
    const user = await response.json();
    return user;
  };

  getDog();