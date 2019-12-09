'use strict';

const url = 'http://localhost:5500';
//const ul = document.querySelector('ul');

const getDog = async () => {
    const idString = window.location.search
    const id = idString.slice(4)

    try{
        
        const response = await fetch(url + '/dog/' + id);
        const dog = await response.json();
        
        getOwner(dog.owner);

        console.log(dog);
        document.getElementById('breed').innerHTML = dog.breed;
        document.getElementById('dog-name').innerHTML = dog.name;
        document.getElementById('dob').innerHTML = new Date(dog.dob).toLocaleDateString();
        document.getElementById('location').innerHTML = dog.location;
        document.getElementById('img').src = "../images/" + dog.filename;
    }catch (e) {
        console.log(e.message);
      }

    
}

const getOwner = async (name) => {
    let owner;
    try{
        const fetchOptions = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
          };
        const response = await fetch(url + '/user/name/' + name, fetchOptions);
        owner = await response.json();
        
    }catch (e) {
        console.log(e.message);
        document.getElementById("main").innerHTML = e.message;
      }

    document.getElementById('owner-name').innerHTML = owner.username;
    document.getElementById('owner-phone').innerHTML = owner.phone;
    document.getElementById('owner-email').innerHTML = owner.email;
    document.getElementById('email').href = "mailto:" + owner.email;
    document.getElementById('phone').href = "phone:" + owner.phone;
}



//delete these if /when login works
getDog();


