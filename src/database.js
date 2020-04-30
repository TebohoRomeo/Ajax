'use strict';

require('dotenv').config();

const {Client} = require("pg");
const client = new Client();

client.connect();

const addNewVisitor = async (visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {

	const sql = `
		INSERT 
		INTO visitors 
		(name, age, date_of_visit, time_of_visit, assistant, comments) 
		VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
	`;
	
	const data = [visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments];

	const res = await client.query(sql, data);
	
	// Results
	return res.rows
}

const deleteVisitor = async (id) => {

	const sql = `
		DELETE 
		FROM visitors 
		WHERE id = $1 RETURNING *
	`;

	const res = await client.query(sql, [id]);
	
	// Results
	return res.rows
}

const deleteVisitors = async () => {

	const res = await client.query(`DELETE FROM visitors RETURNING *`);
	
	// Results
	return res.rows
}

const viewVisitor = async (id) => {

	const res = await client.query(`SELECT * FROM visitors WHERE id = $1`, [id]);
	
	// Results
	return res.rows
}

const viewVisitors = async () => {
	
	const res = await client.query(`SELECT * FROM visitors`);
	
	// Results
	return res.rows
}

const updateVisitor = async (id, visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {

	const sql = `
		UPDATE 
		visitors SET
		name = $2, age = $3, date_of_visit = $4, time_of_visit = $5, assistant = $6, comments = $7 
		WHERE id = $1 
		RETURNING *
	`;
	
	const data = [id, visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments];

	const res = await client.query(sql, data);
	
	// Results
	return res.rows
}

module.exports = { 
	addNewVisitor, deleteVisitor, deleteVisitors, viewVisitor, viewVisitors, updateVisitor
};