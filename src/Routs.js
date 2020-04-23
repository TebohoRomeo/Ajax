'use strict';
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 1221;

const { Client } = require("pg");
const client = new Client();
client.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('.'));

app.get('/single-page-app', async(req, res) => {
    res.sendFile(path.join(__dirname + '/../Ajex.html'))
});

app.post('/addNewVisitor', async(req, res) => {
    
    console.log(req.body)

    let record = await client.query(
    `INSERT INTO visitors(
    visitorName, 
    assistantName, 
    visitorAge, 
    visitDate, 
    visitTime, 
    comments)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *;`, [req.body.visitorName, req.body.assistentName, req.body.age, req.body.date, req.body.time, req.body.comments])

    res.end();
});

app.delete('/deleteVisitor:id', async(req, res) => {

    let record = await client.query(`DELETE FROM visitors WHERE visitorid=${req.params.id}`)

    res.send(record);

    res.end();
});

// Make sure ou finish this project before sunday so you can focus on the other projects

app.get('/viewVisitors', async(req, res) => {

    let record = await client.query(`SELECT * FROM visitors`)

    res.send(record.rows);

    res.end();
});

app.get('/viewVisitor:id', async(req, res) => {

    let record = await client.query(`SELECT * FROM visitors WHERE visitorid=${req.params.id}`)

    res.send(record.rows);

    res.end();
});

app.patch('/updateVisitor:id', async(req, res) => {

    let record = await client.query(
        `UPDATE visitors 
        SET visitorname='${req.body.visitorname}',
        asssistantname='${req.body.assistantname}',
        visitorage=${req.body.visitorage},
        visitdate=${req.body.visitdate}, 
        visittime='${req.body.visittime}', 
        comments='${req.body.comments}'
        WHERE visitorid=${req.params.id}`
    )

    res.send(record);

    res.end();
});

let server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;