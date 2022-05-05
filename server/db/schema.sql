DROP TABLE IF EXISTS  groups_fixtures, fixtures, groups;

CREATE TABLE fixtures (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(30) NOT NULL,
  position INT NOT NULL,
  channels INT NOT NULL,
  red INT NOT NULL,
  green INT NOT NULL,
  blue INT NOT NULL,
  white INT NOT NULL,
  temperature INT NOT NULL,
  dimming_curve INT,
  default_curve INT
);

CREATE TABLE groups (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE groups_fixtures (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  group_id INT NOT NULL REFERENCES groups(id),
  fixture_id INT NOT NULL REFERENCES fixtures(id)
);

INSERT INTO fixtures
  (name, position, channels, red, green, blue, white, temperature, dimming_curve, default_curve)
  VALUES
    ('Down 1', 223, 16, 223, 225, 227, 232, 234, 235, 47),
    ('Down 2', 239, 16, 239, 241, 243, 248, 250, 251, 47),
    ('Down 3', 255, 16, 255, 257, 259, 264, 266, 267, 47),
    ('Down 4', 271, 16, 271, 273, 275, 280, 282, 283, 47),
    ('Down 5', 287, 16, 287, 289, 291, 296, 298, 299, 47),
    ('Down 6', 303, 16, 303, 305, 307, 312, 314, 315, 47),
    ('Down 7', 319, 16, 319, 321, 323, 328, 330, 331, 47),
    ('Down 8', 335, 16, 335, 337, 339, 344, 346, 347, 47);

INSERT INTO groups (name) VALUES ('Down Lights');

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