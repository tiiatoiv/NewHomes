'use strict';

const url = 'http://localhost:5500';
//const ul = document.querySelector('ul');

const getDog = async () => {
    const idString = window.location.search
    const id = idString.slice(4)

    try{
        
        const response = await fetch(url + '/dog/' + id);
        const dog = await response.json();
        console.log(dog);
        document.getElementById('breed').innerHTML = dog.breed;
        document.getElementById('dog-name').innerHTML = dog.name;
        document.getElementById('dob').innerHTML = dog.dob;
        document.getElementById('location').innerHTML = dog.location;
        document.getElementById('img').src = "../images/" + dog.filename;
    }catch (e) {
        console.log(e.message);
      }


  /*const dog = {
    name: 'Mimi', 
    breed: 'poodle',
    dob: '12/12/2018',
    id: 0,
    owner: 'Lily',
    location: 'Helsinki',
    filename: 'dog.jpg'
  }*/

    
}

const getOwner = async (name) => {
    /*let owner;
    try{
    
        const response = await fetch(url + '/user/');
        const users = await response.json();
        owner = users.find((u) => u.name == name);
        if (!owner){
            throw new Error("Owner not found.");
        }
        console.log(users);
        
    }catch (e) {
        console.log(e.message);
        document.getElementById("main").innerHTML = e.message;
      }*/

    
    const owner = {
        name: 'Lily',
        phone: '+358 40 5582316',
        email: 'ienw@metropolia.fi'
    }

    document.getElementById('owner-name').innerHTML = owner.name;
    document.getElementById('owner-phone').innerHTML = owner.phone;
    document.getElementById('owner-email').innerHTML = owner.email;
    document.getElementById('email').href = "mailto:" + owner.email;
    document.getElementById('phone').href = "phone:" + owner.phone;
}



//delete these if /when login works
getDog();
getOwner();

