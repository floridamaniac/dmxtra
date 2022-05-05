const { groups } = require('./controllers');

module.exports = require('express').Router()
  .get('/universes/1/groups', groups.listAll)
  .put('/universes/1/groups/:id/transmit', groups.transmit);
