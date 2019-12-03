'use strict';

const url = 'http://localhost:5500'; // change url when uploading to server

// select existing html elements
const name = document.getElementById('username');
const password = document.getElementById('password');
const retypePassword = document.getElementById('password-retype');

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


/*const checkUsername = async () => {
    try {
        const response = await fetch(url + '/user');
        const usernames = await response.json();
        usernames.forEach ( username =>{
            if(name.value === username.username){
                name.setCustomValidity("Username has been taken!");
            }else{
                name.setCustomValidity(" ");
            }
        });
    } catch (e) {
      console.log(e.message);
    }
};
name.onchange = checkUsername;*/
