'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllDogs = async () => {
    try {
      const [rows] = await promisePool.execute('SELECT dog.*, users.username as ownername FROM dog JOIN users ON dog.owner = users.username;');
      return rows;
    } catch (e) {
      console.log('error', e.message);
      return {error: 'error in database query'};
    }
  };

const getDog = async () => {
    try {
        const [rows] = await promisePool.execute('SELECT dog.*, users.username as ownername FROM dog JOIN users ON dog.owner = users.username WHERE id = ?;');
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

const getUsersDogs = async () => {
    try {
        const [rows] = await promisepool.execute('');
        return [rows];
    } catch (e) {
        console.log('error')
    }
}

  module.exports = {
    getAllDogs,
    getDog,
    //addDog,
    //updateDog,
    //deleteDog
  };