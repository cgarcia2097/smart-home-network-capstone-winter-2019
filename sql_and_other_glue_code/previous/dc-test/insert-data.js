var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "smarthome",
  password: "Salomondrinis110%LOCO",
  database: "sensor_data"
});

var data = [
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 12
  },
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 21
  },
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 14
  },
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 18
  },
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 28
  },
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 16
  },
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 10
  },
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 9
  },
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 22
  },
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 25
  },
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 29
  },
  {
      "device_type": "button",
      "device_ID": "id1",
      "value": 9
  }
];

var sql = "INSERT INTO sensor_data (device_type, device_ID, values) VALUES ?";

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query(sql, [data], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  connection.end();
});

console.log("all done");
