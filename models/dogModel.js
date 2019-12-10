'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

//get all dogs
const getAllDogs = async () => {
    try {
      const [rows] = await promisePool.execute(
        'SELECT dog.*, ROUND(DATEDIFF(CURRENT_DATE ,dob)/365) AS age, dogtypes.size FROM dog JOIN dogtypes ON dog.breed = dogtypes.type;');
      return rows;
    } catch (e) {
      console.log('error', e.message);
      return {error: 'error in database query'};
    }
  };

//get dog to specific page
const getDog = async (params) => {   
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM dog WHERE id = ?;',
        params,
     );
    return rows;
  } catch (e) {
    console.log('error', e.message);       //return error
    return {error: 'error in database query'};
    }
};

//delete specific dog
const deleteDog = async (params) => {    
  try {
    const [rows] = await promisePool.execute(
       'DELETE FROM dog WHERE id = ?;',
        params,
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
    return {error: 'error in database query'};
  }
};
  
//user adds their dog
const addDog = async (params) =>{  
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO dog (name, dob, breed, owner, location, description, filename) VALUES (?,?,?,?,?,?,?);',
       params,
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
    return {error: 'error in database query'};
  }
};
  
//user or admin can update dog post
const updateDog = async (params) =>{  
  try {
    const [rows] = await promisePool.execute(
     'UPDATE dog SET name = ?, dob = ?,  owner = ?, location = ? WHERE id = ?;',
      params,
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
   return {error: 'error in database query'};
  }
};
  
//for searching favorite dog according to params
const searchDog = async (params) => { 
  try {
    const [rows] = await promisePool.execute(
      'SELECT dog.*, dogtypes.size FROM dog JOIN dogtypes ON dog.breed = dogtypes.type WHERE dog.breed = ? OR dogtypes.size = ? OR dog.location = ?',
      params,
  );
    console.log(rows);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllDogs,
  getDog,
  addDog,
  updateDog,
  deleteDog,
  searchDog
};