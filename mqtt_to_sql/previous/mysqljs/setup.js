/*
	File: demo.js
	Author: Charles Garcia
	Date Jan. 31, 2019
	Description: SQL interaction demo using Node.js

	CREDITS: This demo is created using W3Schools code as reference. For use
	in educational purposes only.

*/


var mysql = require('mysql');

var cmd1 = "CREATE DATABASE mydb";
var cmd2 = "SHOW DATABASES";

var con = mysql.createConnection({
  host: "localhost",
  user: "cbgarcia",
  password: "paganihuayra7769%"
});

// Connect to the database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

// Create database called mydb
con.query(cmd1 , function(err, result){
  if(err) throw err;
  console.log("Database mydb created");
});

// Show existing databases
con.query(cmd2, function(err, result){
  if (err) throw err;
  console.log("Current databases");
  console.log(result);
});

// End SQL interaction
con.end( function(err, result){
  if (err) throw err;
});

// Exit
setTimeout((function() {
    console.log("Exiting...");
    return process.exit(1);
}), 5000);
