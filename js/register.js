'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server
// select existing html elements
const name = document.getElementById('username');
const password = document.getElementById('password');
const retypePassword = document.getElementById('password-retype');
const addUserForm = document.getElementById('addUserForm');



//check if 2 passwords match
const validatePassword = () => {
  if(password.value != retypePassword.value) {
    retypePassword.setCustomValidity("Passwords Don't Match");
  } else {
    retypePassword.setCustomValidity('');
  }
}
password.onchange = validatePassword;
retypePassword.onkeyup = validatePassword;

//asign event to submit button 
addUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = serializeJson(addUserForm);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), //body data type must match "Content-Type" header
    };
    const response = await fetch(url + '/auth/register', fetchOptions);
    const json = await response.json();
    console.log('user add response', json);
    // save token
    sessionStorage.setItem('token', json.token); 
    window.location.replace('userpage.html');
  });

/*name.addEventListener('input', async (e) => {
  const input = e.target.value;
  const data = serializeJson({username: input});
  console.log('name check', input);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };
  const exist = await fetch(url + '/auth/checkUser', fetchOptions);
    if(exist)
      name.setCustomValidity('Username is taken.');
    else
      name.setCustomValidity('');
});  */

