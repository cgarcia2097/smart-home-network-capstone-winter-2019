var mysql = require('mysql');
const fs = require('fs');

var connection = mysql.createConnection({
  host: "localhost",
  user: "mqtt_to_sql",
  password: "Salomondrinis110%LOCO",
  database: "sensor"
});

// Connect to SQL database
connection.connect(function(err) {
  if (err) throw err;

  // Query the database
  connection.query("SELECT * FROM sensor_db", function (err, result, fields) {
    if (err) throw err;

    console.log(result);

    // Convert to string format
    var jsonData = JSON.stringify(result);

    // Write to file
    fs.writeFile("public/javascripts/test5.js", "var data = "+JSON.stringify(result, null, 4)+";", function(err) {
        if(err) return console.log(err);
        console.log("The file was saved!");
    });
  });

  // Terminate connection
  connection.end();
});
