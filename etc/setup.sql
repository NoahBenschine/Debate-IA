CREATE TABLE user_profile (
    id      serial,
    name    varchar(80) NOT NULL,
    email   varchar(90) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE topic (
    id      serial,
    name    varchar(80) NOT NULL UNIQUE,
    owner_id  int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES user_profile(id) ON DELETE CASCADE
);
CREATE TABLE debate (
    id      serial,
    date    DATE,
    topic_name  varchar(90) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);
CREATE TABLE vote(
    id      serial,
    topic_id  int NOT NULL,
    owner_id  int NOT NULL,
    debate_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES user_profile(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topic(id) ON DELETE CASCADE,
    FOREIGN KEY (debate_id) REFERENCES debate(id) ON DELETE CASCADE
);
CREATE TYPE side AS ENUM ('Pro', 'Con');


CREATE TABLE sides(
    id      serial,
    topic_id  int NOT NULL,
    owner_id  int NOT NULL,
    debate_id int NOT NULL,
    side      side,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES user_profile(id)ON it DELETE CASCADE,
    FOREIGN KEY (debate_id) REFERENCES debate(id) ON DELETE CASCADE
);
