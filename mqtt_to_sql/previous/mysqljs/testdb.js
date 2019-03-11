/*
	File: testdb.js
	Author: Charles Garcia
	Date Jan. 31, 2019
	Description: SQL interaction demo using Node.js

	CREDITS: This demo is created using W3Schools code as reference. For use
	in educational purposes only.

*/


var mysql = require('mysql');

var cmd1 = "CREATE DATABASE mydb";
var cmd2 = "SHOW DATABASES";
var cmd3 = "DROP DATABASE mydb";

var con2 = mysql.createConnection({
  host: "localhost",
  user: "cbgarcia",
  password: "paganihuayra7769%",
  database: "mydb"

});

con2.connect(function(err){
  if(err) throw err;
  console.log("Successfully Connected");
});

//con2.query({});

// Create tables
var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";

con2.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});

var sql = "INSERT INTO customers (name, address) VALUES ?";

var values = [
    ['John', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
  ];

con2.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
});

con2.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

// Exit
setTimeout((function() {
    console.log("Exiting...");
    return process.exit(1);
}), 5000);
