'use strict';

const ul = document.querySelector('ul');

const getDog = async () => {
  const dog = {
    name: 'Mimi', 
    breed: 'poodle',
    dob: '12/12/2018',
    id: 0,
    owner: 'Lily',
    location: 'Helsinki',
    filename: 'dog.jpg'
  }

  document.getElementById('breed').innerHTML = dog.breed;
  document.getElementById('dog-name').innerHTML = dog.name;
  document.getElementById('dob').innerHTML = dog.dob;
  document.getElementById('location').innerHTML = dog.location;
  document.getElementById('img').src = "../images/" + dog.filename;

};

const getOwner = async () => {
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
