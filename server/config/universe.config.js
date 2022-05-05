/* eslint-disable new-cap */
const dmxlib = require('dmxnet');

const dmxnet = new dmxlib.dmxnet();

const IP_ADDRESS = '10.1.9.30';
const UNIVERSE = 1;

const universe = dmxnet.newSender({
  ip: IP_ADDRESS,
  universe: UNIVERSE,
});

module.exports = universe;
