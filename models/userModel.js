'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

//This file contains functions to update the users table in the database
//Fetch info, update and delete

//get all users from database
const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM users');
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

//get a single user info from database
const getUser = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            //'SELECT * FROM users WHERE id = 1;',
            'SELECT username, email FROM users WHERE users.id = 2',
        params,
        );
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

//add a new user into database
const addUser = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?);',
            params,
        );
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

//update users info
/**const updateUser = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?;',
            params);
        return rows;
    }
    catch (e) {
        console.log('error', e.message);
    }
}; */

//delete user from database
const deleteUser = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'DELETE FROM users WHERE id = ?;',
            params);
        return rows;
    }
    catch (e) {
        console.log('error', e.message);
    }
};

const getUserLogin = async (params) => {
    try {
        console.log(params);
        const [rows] = await promisePool.execute(
          'SELECT * FROM users WHERE username = ?;',
          params);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
  };

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    deleteUser,
    getUserLogin
};
