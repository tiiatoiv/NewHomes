'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const messageController = require('../controllers/messageController');

router.get('/', messageController.message_list_get);  //get all the dog on main page

router.get('/:id', messageController.message_get);     //get specific dog


router.post('/', messageController.message_create_post);

//router.put('/', dogController.dog_update_put);  //modified dog

router.delete('/:id', messageController.message_delete);  //delete dog

module.exports = router;