const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.use('/', require('./routes'));

app.listen(3000);
