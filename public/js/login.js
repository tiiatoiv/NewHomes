'use strict';
//const url = 'http://localhost:5500';
const url = '/app/';

const logUserForm = document.getElementById('logUserForm');

//event listener for log in button
console.log("log user form", logUserForm);
logUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = serializeJson(logUserForm);
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    };
  
    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = await response.json();
    console.log('login response', json);
    if (!json.user) {
        alert(json.message);
    } else {
      // save token
        sessionStorage.setItem('token', json.token);
        sessionStorage.setItem('user', JSON.stringify(json.user));
        window.location.replace('userpage.html');
    }
  });