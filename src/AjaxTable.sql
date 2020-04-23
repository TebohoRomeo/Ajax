drop table if exists visitors;
create table visitors(
    visitorID SERIAL PRIMARY KEY,
    visitorName varchar,
    assistantName varchar,
    visitorAge integer, 
    visitDate date,
    visitTime time without time zone,
    comments varchar
);