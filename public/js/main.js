const form = document.forms[0];

// Form submit
form.onsubmit = async e => {
	e.preventDefault();

	// Form inputs
	const body = {
		name: 			e.target[0].value,
		age: 			e.target[1].value,
		date_of_visit: 	e.target[2].value,
		time_of_visit: 	e.target[3].value,
		assistant: 		e.target[4].value,
		comments: 		e.target[5].value,
	}

	// Send request
	submitForm(body)

	// Clear inputs
	for(let i = 0; i < e.target.length; i++) {
		e.target[i].value = null;
	}
}

const submitForm = async body => {
	const res = await fetch('http://127.0.0.1:2500/add-new-visitor', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(body)
	});

	const data = await res.json();
	createTableRows([data.visitor]);

	return data;
}

// Create table rows
const createTableRows = visitors => {
	const tbody = document.getElementById('visitors');

	for (let i = 0; i < visitors.length; i++) {
		let row = createTableColumns(visitors[i]);

		// Set attributes
		row.setAttribute('id', `visitor-${visitors[i].id}`);
		tbody.prepend(row);
	}
}

// Create table columns
const createTableColumns = visitor => {

	// Create a row
	let row = document.createElement('tr');

	// Create ID column
	let tdID = document.createElement('td');
	tdID.innerHTML = visitor.id;
	row.appendChild(tdID);

	// Create Name column
	let tdName = document.createElement('td');
	tdName.innerHTML = visitor.name;
	row.appendChild(tdName)

	// Create Age column
	let tdAge = document.createElement('td');
	tdAge.innerHTML = visitor.age;
	row.appendChild(tdAge);

	// Create Date column
	let tdDate = document.createElement('td');
	tdDate.innerHTML = new Date(visitor.date_of_visit).toLocaleDateString();
	row.appendChild(tdDate);

	// Create Time column
	let tdTime = document.createElement('td');
	tdTime.innerHTML = visitor.time_of_visit;
	row.appendChild(tdTime);

	// Create Assistant column
	let tdAssistant = document.createElement('td');
	tdAssistant.innerHTML = visitor.assistant;
	row.appendChild(tdAssistant);

	// Create Comments column
	let tdComments = document.createElement('td');
	tdComments.innerHTML = visitor.comments;
	row.appendChild(tdComments);
	
	// Create a delete button
	const button = createDeleteButton(visitor.id);
	row.appendChild(button);

	return row;
}

// Row delete button
const createDeleteButton = id => {
	let td = document.createElement('td');

	// Set attributes
	td.innerHTML = `<button onclick="deleteTableRow(${id})">X</button>`;

	return td;
}

// Delete table row
const deleteTableRow = async id => {
	const tbody = document.getElementById('visitors');
	const row = document.getElementById(`visitor-${id}`);
	
	// Send request
	const res = await fetch(`http://127.0.0.1:2500/delete-visitor/${id}`, {
		method: 'delete'
	});

	const data = await res.json();

	if (data.status == 'ok') {
		// Remove element
		tbody.removeChild(row);
	}
}

// Initialize table data
const init = async () => {
	
	const res = await fetch('http://127.0.0.1:2500/view-visitors');
	const data = await res.json();

	createTableRows(data.visitors);
}

init();

module.exports = {init, submitForm, deleteTableRow}