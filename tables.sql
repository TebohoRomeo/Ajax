CREATE TABLE visitors (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    age int,
    date_of_visit date,
    time_of_visit time,
    assistant varchar(255),
    comments text
);