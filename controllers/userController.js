'use strict';
const userModel = require('../models/userModel');

const user_list_get = async (req, res) => {
    console.log('get user or users', req.user);
    if(req.user){
        const user = await userModel.getUser(req.user.id);
        console.log('got user', user);
        await res.json(user[0]);
    } else {
        const users = await userModel.getAllUsers();
        await res.json(users);
    }
};

const user_get = async (req, res) => {
    const params = [req.params.id];
    const user = await userModel.getUserAnyone(params);
    await res.json(user[0]);
};

const user_create_account = async (req, res) => {
    console.log("account",req.body);
    const params = [
        req.body.username,
        req.body.email,
        req.body.password,
    ];
    const response = await userModel.addUser(params);
    const user = await userModel.getUser([response.insertId]);
    await res.json(user);
};

/**
const user_update_put = async (req, res) => {
    const params = [
        req.body.name,
        req.body.password,
        req.body.id];
    console.log('update', params);
    const user = await userModel.updateUser(params);
    await res.json(user);
};
*/
//check if username exits or not
const user_delete = async (req, res) => {
    const params = [req.params.id];
    console.log('delete', params);
    const user = await userModel.deleteUser(params);
    await res.json(user);
};


module.exports = {
    user_list_get,
    user_get,
    user_create_account,
    //user_update_put,
    user_delete,
};
