'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const port = 5500;
const dogRoute = require('./routes/dogRoute');
const userRoute = require('./routes/userRoute');
const breedRoute = require('./routes/breedRoute');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
//app.use(express.static('uploads'));
//app.use('/thumbnails', express.static('thumbnails'));

app.use('/dog', dogRoute);
app.use('/user', userRoute);
app.use('/breed', breedRoute);


app.listen(port, () => console.log(`App listens on port ${port}!`));
