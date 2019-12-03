'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
//const upload = multer({dest: 'uploads/'});
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);  //get all of the users

router.get('/:id', userController.user_get); //get certain user

router.post('/', userController.user_create_account); //put a new user into database


router.delete('/:id', userController.user_delete);

module.exports = router;