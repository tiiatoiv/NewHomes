'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllDogs = async () => {
    try {
      const [rows] = await promisePool.execute('SELECT dog.*, users.username as ownername FROM dog JOIN users ON users.username = dog.owner;');
      return rows;
    } catch (e) {
      console.log('error', e.message);
      return {error: 'error in database query'};
    }
  };

  module.exports = {
    getAllDogs,
    //getDog,
    //addDog,
    //updateDog,
    //deleteDog
  };