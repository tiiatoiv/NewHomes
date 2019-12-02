'use strict';

const dogModel = require('../models/dogModel');
//const resize = require('../utils/resize');
//const imageMeta = require('../utils/imageMeta');

const dog_list_get = async (req, res) => {
  const dogs = await dogModel.getAllDogs();
  await res.json(dogs);
};

const dog_get = async (req, res) => {
    const dog = await dogModel.getDog();
    await res.json(dos);
};

module.exports = {
    dog_list_get,
    dog_get
    //cat_create_post,
    //cat_get,
    //cat_delete,
    //cat_update_put
  };