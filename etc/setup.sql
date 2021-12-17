CREATE TABLE fruits(
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL
);
Wed 5:28pm
CREATE TYPE side AS ENUM ('Pro', 'Con');
CREATE TABLE person (
   name text,
   side  side
);
