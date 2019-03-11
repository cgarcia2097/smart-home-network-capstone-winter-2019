/**
 * File: post_mqtt_1.1.js
 * Date: March 6, 2019
 * Author: Charles Garcia
 * 
 * Description: Receive an HTTP POST request, parse it for commands
 *              and publish to MQTT sensor topic
 */

// Initialize app dependencies
const http = require('http');
const mqtt = require('mqtt');

// Connect to MQTT broker
const client = mqtt.connect('mqtt://127.0.0.1:1883');

const topic = "sensors/commands";

// Create HTTP server for receiving requests
http.createServer(function (req, res) {

  // Subscribe to MQTT topic
  client.subscribe(topic, function(err){
    if (err) throw err;

    // Write response to client
    res.write('Hello World!\n'); 

    // Display the request given
    switch(req.method){
      case 'POST':
      res.write(req.method);
      client.publish(topic, "This is a " + req.method.toString() + " request");
      break;

      case 'GET':
      res.write(req.method);
      client.publish(topic, "This is a " + req.method.toString() + " request");
      break;

      case 'PUT':
      res.write(req.method);
      client.publish(topic, "This is a " + req.method.toString() + " request");
      break;

      default:
      break;
    }

    // Print contents of header
    console.log(req);

    // End response
    res.end();

  });

}).listen(8080); // HTTP server listening at port 8080