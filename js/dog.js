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
        document.getElementById('img').src = "../uploads/" + dog.filename;
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

    
    /*const owner = {
        name: 'Lily',
        phone: '+358 40 5582316',
        email: 'ienw@metropolia.fi'
    }*/

    document.getElementById('owner-name').innerHTML = owner.username;
    document.getElementById('owner-phone').innerHTML = owner.phone;
    document.getElementById('owner-email').innerHTML = owner.email;
    document.getElementById('email').href = "mailto:" + owner.email;
    document.getElementById('phone').href = "phone:" + owner.phone;
}



//delete these if /when login works
getDog();

window.onload = () => {

    const idString = window.location.search
    const id = idString.slice(4);

    const ip = "TODO SET IP";
    document.getElementById("fb").href =
        `https://www.facebook.com/sharer/sharer.php?u=http%3A//${ip}/dog.html?id=${id}`;
        
    document.getElementById("twit").href =
    `https://twitter.com/intent/tweet?text=NewHomes!%20Find%20your%20new%20dog%20now%3A%20http%3A//${ip}/dog.html?id=${id}`

        

    const liked = JSON.parse(localStorage.getItem("liked") || "{}");
    console.log("liked", liked)
    if (liked[id]) {
        console.log("this dog has been liked")
        document.getElementById("like").style.background = "crimson"
    }

    document.getElementById("like").onclick = event => {
        console.log("liked", liked)
        liked[id] = true;
        document.getElementById("like").style.background = "crimson"
        localStorage.setItem("liked", JSON.stringify(liked));
    }
}