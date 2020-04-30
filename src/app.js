const express = require('express');
const path 	  = require('path');

// Database
const {addNewVisitor, deleteVisitor, deleteVisitors, viewVisitor, viewVisitors, updateVisitor} = require('./database');

// Create app
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use('/single-page-app', express.static('public'));

// Static file
app.get('/single-page-app', (req, res) => {
	return res.sendFile(`index.html`);
});

// Add visitor
app.post('/add-new-visitor', async (req, res) => {

	// Inputs
	let name 		= req.body.name;
	let age 		= req.body.age;
	let date 		= req.body.date_of_visit;
	let time 		= req.body.time_of_visit;
	let assistant 	= req.body.assistant;
	let comments 	= req.body.comments;

	// Save visitor
	const visitor = await addNewVisitor(name, age, date, time, assistant, comments);

	res.status(200).json({ 
		status: 'ok',
		visitor: visitor[0] 
	});

});

// Delete visitor
app.delete('/delete-visitor/:id', async (req, res) => {
	
	const id = req.params.id;

	// Delete visitor
	const visitor = await deleteVisitor(id);

	res.status(200).json({ 
		status: 'ok',
		visitor: visitor[0] 
	});

});

// View visitors
app.get('/view-visitors', async (req, res) => {
	
	// View visitors
	const visitors = await viewVisitors();

	res.status(200).json({ 
		status: 'ok',
		visitors: visitors
	});

});

const server = app.listen(2500, () => console.log('Express Server is running on Port: 2500'));

module.exports = server;