const universe = require('../config/universe.config');
const db = require('../config/db.config');

const fixturesQuery = `
  SELECT fixtures.*
    FROM fixtures
    LEFT JOIN groups_fixtures
    ON groups_fixtures.fixture_id = fixtures.id
    WHERE groups_fixtures.group_id = $1;
`;

const groupUpdateQuery = `
  UPDATE groups
    SET red = $1, green = $2, blue = $3, brightness = $4
    WHERE groups.id = $5;
`;

const allQuery = `
  SELECT *
  FROM groups;
`;

class Group {
  constructor(groupId, fixtures) {
    this.fixtures = fixtures.rows;
    this.name = null;
    this.id = groupId;
  }

  static async find(id) {
    const fixtures = await db.result(fixturesQuery, [id]);
    return new Group(id, fixtures);
  }

  // TBD
  static async all() {
    return db.result(allQuery);
  }

  transmit(attributes) {
    this.fixtures.forEach((fixture) => {
      Object.keys(attributes).forEach((attribute) => {
        universe.prepChannel(fixture[attribute] - 1, attributes[attribute]);
      });
      universe.prepChannel(fixture.shutter - 1, fixture.shutter_default);
      universe.prepChannel(fixture.brightness - 1, 150);
    });
    universe.transmit();

    db.result(groupUpdateQuery, [attributes.red, attributes.green, attributes.blue, 150, this.id]);
  }

  turnOff() {
    this.fixtures.forEach((fixture) => {
      universe.prepChannel(fixture.brightness - 1, 0);
    });
    universe.transmit();
  }
}

module.exports = Group;
