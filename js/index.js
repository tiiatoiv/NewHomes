'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const ul = document.getElementById('doglist');  //select ul element in index.html
const breedList = document.querySelectorAll('.breed-list');
const size = document.getElementById('size');

//create option for search-select element
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

// get breeds to form options in search part
const getBreeds = async () => {
    try {
      const response = await fetch(url + '/breed/');
      const breeds = await response.json();
      createBreedOptions(breeds);
    } catch (e) {
    console.log(e.message);
  }
};
getBreeds();


//build ul element with dog attribute
const getDogs = async () => {
    const response = await fetch(url + '/dog');
    const dogs = await response.json();
    dogs.forEach( async (dog) => {
      const breed = await getBreed(dog.breed);
      ul.innerHTML += `
      <li>
          <h2>${dog.name}</h2>
          <figure>
              <img src="${url}/uploads/${dog.filename}" class="resp" alt="${dog.name}">
          </figure>
          <p>Age: ${dog.age}</p>
          <p>Size: ${breed.size}</p>
          <p>Owner: ${dog.owner}</p>
          <p>Location: ${dog.location}</p>
      </li>
      `;
    });
};

const getBreed = async (id) => {
  try {
    const response = await fetch(url + '/breed/' + id);
    const breed = await response.json();
    return breed;
  } catch (e){
    console.log(e.message);
  }
};
getDogs();