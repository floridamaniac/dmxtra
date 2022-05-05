const { Group } = require('../models');

module.exports = {
  transmit: async (req, res) => {
    // const { r, g, b } = req.body;
    const group = await Group.find(req.params.id);
    group.transmit(req.body);
    res.sendStatus(200);
  },
  listAll: async (req, res) => {
    const groups = await Group.all();
    console.log(groups.rows);
    res.send(groups.rows);
  },
};
