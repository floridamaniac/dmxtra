const { groups } = require('./controllers');

module.exports = require('express').Router()
  .put('/universe/1/groups/:id/transmit', groups.transmit);
