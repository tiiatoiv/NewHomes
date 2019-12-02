'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const port = 5500;
const dogRoute = require('./routes/dogRoute');
app.use(cors());
app.use('/index', dogRoute);
app.use('/index', dogRoute);


app.listen(port, () => console.log(`App listens on port ${port}!`));
