class Fixture {
  constructor(name, channels, position, properties) {
    this.name = name;
    this.channels = channels;
    this.position = position;
    properties.forEach((property) => {
      this[property[0]] = property[1] - 1 + position;
    });
  }
}

const fixtures = [];

for (var position of [222,238,254,270,286,302,318,334]) {
  fixtures.push(new Fixture("ArenaQ7", 16, position, [
    ["red", 1],
    ["green", 3],
    ["blue", 5],
    ["white", 10],
    ["shutter", 12],
    ["dimmingcurve", 13]
  ]));
};

module.exports = fixtures;
