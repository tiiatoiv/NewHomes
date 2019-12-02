'use strict';
const userModel = require('../models/userModel');

const user_list_get = async (req, res) => {
    const users = await userModel.getAllUsers();
    await res.json(users);
};

const user_get = async (req, res) => {
    const params = [req.params.id];
    const user = await userModel.getUser(params);
    await res.json(user[0]);
};

const user_create_account = async (req, res) => {
    const params = [
        req.body.name,
        req.body.email,
        req.body.passwd,
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

const user_delete = async (req, res) => {
    const params = [req.params.id];
    console.log('delete', params);
    const cat = await userModel.deleteUser(params);
    await res.json(cat);
};

module.exports = {
    user_list_get,
    user_get,
    user_create_account,
    //user_update_put,
    user_delete,
};
