// eslint-disable-next-line new-cap
const dmxlib = require('dmxnet');

const dmxnet = new dmxlib.dmxnet();
const express = require('express');
const path = require('path');
const fixtures = require('./models');
// const cors = require('cors');

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
// app.use(cors());

const IP_ADDRESS = '10.1.9.30';
const UNIVERSE = 1;

const sender = dmxnet.newSender({
  ip: IP_ADDRESS,
  universe: UNIVERSE,
});

sender.transmit();

app.post('/fixtures', (req, res) => {
  const { r, g, b } = req.body;
  fixtures.forEach((fixture) => {
    sender.prepChannel(fixture.red, r);
    sender.prepChannel(fixture.green, g);
    sender.prepChannel(fixture.blue, b);
    sender.prepChannel(fixture.white, 255);
    sender.prepChannel(fixture.shutter, 47);
    // sender.prepChannel(fixture.dimmingcurve, 12);
  });
  sender.transmit();
  res.sendStatus(200);
});

app.listen(3000);
