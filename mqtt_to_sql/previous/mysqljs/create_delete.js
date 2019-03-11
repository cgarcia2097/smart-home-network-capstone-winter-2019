var mysql = require('mysql');

var cmd1 = "CREATE DATABASE mydb";
var cmd2 = "SHOW DATABASES";
var cmd3 = "DROP DATABASE mydb";

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

// Delete the newly-created database 
con.query(cmd3, function(err, result){
  if (err) throw err;
  console.log("Database mydb deleted");
  console.log(result);
con.query(cmd2, function(err, result){
  if (err) throw err;
  console.log("Current databases");
  console.log(result);
});
});

// Exit
setTimeout((function() {  
    return process.exit(1);
}), 5000);
