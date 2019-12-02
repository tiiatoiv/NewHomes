'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM users');
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

const getUser = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM users WHERE id = ?;',
            params,
        );
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

const addUser = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?);',
            params,
        );
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

const updateUser = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?;',
            params);
        return rows;
    }
    catch (e) {
        console.log('error', e.message);
    }
};

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

module.exports = {
    getAllUsers,
    getUser,
    addUser,
};
