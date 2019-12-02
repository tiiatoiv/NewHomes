'use strict';

const dogModel = require('../models/dogModel');
//const resize = require('../utils/resize');
//const imageMeta = require('../utils/imageMeta');

const dog_list_get = async (req, res) => {  //get all list to the main page
  const dogs = await dogModel.getAllDogs();
  await res.json(dogs);
};

const dog_create_post = async (req, res) => {
  try{
    //create thumbnail
    //await resize.makeThumbnail(req.file.path,'thumbnails/' + req.file.filename, {width: 160, height: 160});
    // get coordinates
    //const coords = await imageMeta.getCoordinates(req.file.path);
    //console.log('coords', coords);

    const params = [
      req.body.name,
      req.body.age,
      req.body.owner,
      req.body.location,
      req.file.filename,
      //coords
    ];
    const response = await dogModel.addDog(params);
    await res.json(response);
} catch (e){
  console.log('exif error', e);
  res.status(400).json({message: 'error'});
}};

const dog_get = async (req, res) => {  // get dog from user's input id
  const params = [req.params.id];
  const dog = await dogModel.getDog(params);
  await res.json(dog[0]);
};

const dog_delete = async (req, res) => {   //user or admin deletes dog
  const params = [req.params.id];
  const dog = await dogModel.deleteDog(params);
  await res.json(dog);
};

const dog_update_put = async(req,res) => {  //user or admin updates dog
  const params = [
    req.body.name,
    req.body.age,
    req.body.location, 
    req.body.owner,
  ]
  const response = await dogModel.updateDog(params);
  await res.json(response);
}

module.exports = {
    dog_list_get,
    dog_create_post,
    dog_get,
    dog_delete,
    dog_update_put
  };