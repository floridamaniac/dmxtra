DROP TABLE IF EXISTS  groups_fixtures, fixtures, groups;

CREATE TABLE fixtures (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(30) NOT NULL,
  position INT NOT NULL,
  channels INT NOT NULL,
  red INT NOT NULL,
  green INT NOT NULL,
  blue INT NOT NULL,
  brightness INT NOT NULL,
  shutter INT,
  shutter_default INT
);

CREATE TABLE groups (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(30) NOT NULL,
  red INT NOT NULL DEFAULT 0,
  green INT NOT NULL DEFAULT 0,
  blue INT NOT NULL DEFAULT 0,
  brightness INT NOT NULL DEFAULT 255
);

CREATE TABLE groups_fixtures (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  group_id INT NOT NULL REFERENCES groups(id),
  fixture_id INT NOT NULL REFERENCES fixtures(id)
);

INSERT INTO fixtures
  (name, position, channels, red, green, blue, brightness, shutter, shutter_default)
  VALUES
    ('Main 1', 223, 16, 223, 225, 227, 232, 234, 47),
    ('Main 2', 239, 16, 239, 241, 243, 248, 250, 47),
    ('Main 3', 255, 16, 255, 257, 259, 264, 266, 47),
    ('Main 4', 271, 16, 271, 273, 275, 280, 282, 47),
    ('Main 5', 287, 16, 287, 289, 291, 296, 298, 47),
    ('Main 6', 303, 16, 303, 305, 307, 312, 314, 47),
    ('Main 7', 319, 16, 319, 321, 323, 328, 330, 47),
    ('Main 8', 335, 16, 335, 337, 339, 344, 346, 47);

INSERT INTO fixtures
  (name, position, channels, red, green, blue, brightness, shutter, shutter_default)
  VALUES
    ('Up 1', 1, 12, 1, 2, 3, 7, 8, 97),
    ('Up 2', 13, 12, 13, 14, 15, 19, 20, 97),
    ('Up 3', 25, 12, 25, 26, 27, 31, 32, 97),
    ('Up 4', 37, 12, 37, 38, 39, 43, 44, 97),
    ('Up 5', 49, 12, 49, 50, 51, 55, 56, 97),
    ('Up 6', 61, 12, 61, 62, 63, 67, 68, 97),
    ('Up 7', 73, 12, 73, 74, 75, 79, 80, 97),
    ('Up 8', 85, 12, 85, 86, 87, 91, 92, 97);

INSERT INTO groups (name) VALUES ('Main Lights');
INSERT INTO groups (name) VALUES ('Up Lights');

INSERT INTO groups_fixtures
  (group_id, fixture_id)
  VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8);

INSERT INTO groups_fixtures
  (group_id, fixture_id)
  VALUES
    (2, 9),
    (2, 10),
    (2, 11),
    (2, 12),
    (2, 13),
    (2, 14),
    (2, 15),
    (2, 16);