/**
 * File: client.js
 * Date: March 6, 2019
 * Author: Postman
 * Description: Postman-generated Node.js script that sends a POST request 
 *              to given URL
 */

var http = require("http");

var options = {
  "method": "POST",
  "hostname": "0.0.0.0",
  "port": "8080",
  "headers": {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    "Postman-Token": "84cbd668-7808-4830-80bd-bf53c5850a2a"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ device_type: 'sensor',
  device_ID: 'sensor-42069666',
  command: 'ON' }));
req.end();