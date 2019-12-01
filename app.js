'use strict';

const express = require('express');
const app = express();
const port = 5500;
const dogRoute = require('./routes/dogRoute');

app.use('/index', dogRoute)

app.listen(port, () => console.log(`App listens on port ${port}!`));
