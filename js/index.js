'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

const ul = document.getElementById('doglist');  //select ul element in index.html
const breedList = document.querySelectorAll('.breed-list');
const breedSearch = document.getElementById('breedSearch');
const sizeSearch = document.getElementById('sizeSearch');
const locationSearch = document.getElementById('locationSearch');
const search = document.getElementById('searchForm');
const loginButton = document.getElementById('loginbutton');
const logoutButton = document.getElementById('logoutbutton');

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

//build specific card for each dog
const getDog =  (dogs) => {
  // clear ul
  ul.innerHTML = '';
  dogs.forEach( async (dog) => {
    // create li with DOM methods
    const breed =  await getBreed(dog.breed);
    const img = document.createElement('img');
    img.src = url + '/uploads/' + dog.filename;
    img.alt = dog.name;
    img.classList.add('resp');  

    const figure = document.createElement('figure').appendChild(img);

    const h2 = document.createElement('h2');
    h2.innerHTML = dog.name;

    const p1 = document.createElement('p');
    p1.innerHTML = `Age: ${dog.age}`;

    const p2 = document.createElement('p');
    p2.innerHTML = `Breed: ${dog.breed}`;

    const p3 = document.createElement('p');
    p3.innerHTML = `Size: ${breed.size}`;

    const p4 = document.createElement('p');
    p4.innerHTML = `Owner: ${dog.owner}`;

    const p5 = document.createElement('p');
    p5.innerHTML = `Location: ${dog.location}`;

    const viewButton = document.createElement('button');
    viewButton.innerHTML = 'View';
    viewButton.className = 'viewButton';
    viewButton.setAttribute ('class', 'viewButton');  //add style
    viewButton.addEventListener('click', () => {  //when clicked, redirect to its page
      const id = dog.id;
      try{
          window.location.assign('http://127.0.0.1:5500/html/dog.html?id=' + id);
      } catch (e) {
          console.log(e.message);
      }
    });

    const li = document.createElement('li');
    li.classList.add('light-border');
    li.setAttribute('class','dogItem');

    //append element
    li.appendChild(h2);
    li.appendChild(figure);
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    li.appendChild(p4);
    li.appendChild(p5);
    li.appendChild(viewButton);
    ul.appendChild(li);
  });
};

//get all dogs in databse 
const getDogs = async () => {
  try {
    const response = await fetch(url + '/dog');
    const dogs = await response.json();
    getDog(dogs);
  }
  catch (e) {
    console.log(e.message);
  }
};
getDogs();
 
//get information of breed with name(id)
const getBreed = async (id) => {
  try {
    const response = await fetch(url + '/breed/' + id);
    const breed = await response.json();
    return breed;
  } catch (e){
    console.log(e.message);
  }
};

search.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log("clcik");
  const breed = breedSearch.options[breedSearch.selectedIndex].text;
  const size = sizeSearch.options[sizeSearch.selectedIndex].text;
  const location = locationSearch.value;
  console.log(breed, size, location);
  try {
    const response = await fetch(url + '/dog/search/' + breed + '/' + size +'/'+ location);
    const dogs = await response.json();
    getDog(dogs);
  } catch (e) {
  console.log(e.message);
  }
});

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
      //show/hid logout/login button
      logoutButton.style.display = 'none';
      loginButton.style.display = 'block';
      window.location.replace('index.html');
  }
  catch (e) {
      console.log(e.message);
  }
});

logoutButton.style.display = 'none';
if (sessionStorage.getItem('token')) {
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
};