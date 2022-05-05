const { Group } = require('../models');

module.exports = {
  transmit: async (req, res) => {
    const group = await Group.find(req.params.id);
    group.transmit(req.body);
    res.sendStatus(200);
  },
  listAll: async (req, res) => {
    const groups = await Group.all();
    res.send(groups.rows);
  },
  turnOff: async (req, res) => {
    const group = await Group.find(req.params.id);
    group.turnOff();
    res.sendStatus(200);
  },
};
