/*
	File: server.js
	Author: Charles Garcia
	Date: Feb. 1, 2019
	Description: Displaying SQL Data over the Express Framework
*/

'use strict';

const express = require('express');
const mysql = require('mysql');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Configure MySQL connection
const sqldb = mysql.createConnection({
	host: "localhost",
	user: "smarthome",
	password: "Salomondrinis110%LOCO",
	database: "sensor_data"
});

// Connect to the database
sqldb.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

var sql_out;

// Access once and store
var table = sqldb.query("SELECT * FROM sensor_data", function(err, result){
	if (err) throw err;
	sql_out = result;
	console.log(result);
});


// Instantiate App
const app = express();

app.get('/', (req, res) => {
	res.send(sql_out);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


