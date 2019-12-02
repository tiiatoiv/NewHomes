'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
//const upload = multer({dest: 'uploads/'});
const userController = require('../controllers/userController');

    //router.get('/', dogController.dog_list_get);  //get all the dog on main page

    //router.get('/:id', dogController.dog_get);     //get specific dog

    //router.post('/', upload.single('dog'), dogController.dog_create_post);

    //router.put('/', dogController.dog_update_put);  //modified dog

    //router.delete('/:id', dogController.dog_delete);

//router for fetching the user info from database

router.get('/', userController.user_list_get);  //get all the dog on main page

router.get('/:id', userController.user_get);

router.post('/', userController.user_create_account); //put a new user into database

router.delete('/:id', userController.user_delete);

module.exports = router;