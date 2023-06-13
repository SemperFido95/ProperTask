
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE properties (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users,
	street VARCHAR (100) NOT NULL,
	city VARCHAR (50) NOT NULL,
	state VARCHAR (50) NOT NULL,
	zip INT NOT NULL
);

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users,
	task VARCHAR (500) NOT NULL
);

CREATE TABLE property_tasks (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users,
	property_id INT REFERENCES properties,
	task_id INT REFERENCES tasks,
	task_status BOOLEAN DEFAULT true
);  