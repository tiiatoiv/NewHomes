'use strict';

const logUserForm = document.getElementById('logUserForm');

logUserForm.addEventListener('login', async (e) => {
    e.preventDefault();
    const data = serializeJson(loginForm);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      window.location.assign('userpage.html');
    }
  });