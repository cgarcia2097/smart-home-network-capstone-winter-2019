/**
 * File: post_to_mqtt_1.1.js
 * Date: March 7, 2019
 * Author: Charles Garcia
 * 
 * Description: 
 *      - Receive an HTTP POST request, parse it for sensor commands
 *        and publish to MQTT sensor topic
 * 
 * TODO:
 *      - Verify if request is from specific URL and is a POST request
 *      - Parse POST body for sensor commands
 *      - Check if device_type, device_ID and command is legal
 *      - If legal, publish sensor command over MQTT topic as JSON string
 * 
 */

const topic = "sensors/commands";

// Initialize app dependencies
const http = require('http');
const mqtt = require('mqtt');
// const bodyParser = require('body-parser');

// Connect to MQTT broker
const mqttClient = mqtt.connect('mqtt://127.0.0.1:1883');

// Create HTTP server
const server = http.createServer();

/* Functions */

/**
 * @brief Check if the Sonoff commands are correct
 * @param {*} commandObject
 * @returns the command
 */
function checkSonoffCommands(commandObject){
  switch(commandObject.command){

    // Turn switch on 
    case 'ON':
    return commandObject;
    break;
    
    // Turn switch off
    case 'OFF':
    return commandObject;
    break;

    // Unsupported commands
    default:
    console.error(commandObject.device_type + ': Unsupported command');
    return 'NULL';
    break;
  }
}

/**
 * @brief Check if device is legal/supported
 * @returns commandObject containing legal value, null if invalid
 * @param {*} commandObject 
 */
function checkDevice(commandObject){
  switch(commandObject.device_type){

    // Supported devices
    // Create seperate check'Device'Commands() when adding new device
    // Add devices here when expanding
    case 'sonoff':
    return checkSonoffCommands(commandObject);
    break;

    // Unsupported devices
    default:
    console.error('Unsupported device');
    return 'NULL';
    break;
  }
}

/**
 * @brief Parse JSON string representing device command
 * @param commandObject : a JSON object {device_type, device_ID, command}
 * @returns JSON string representing device command
 */
function processCommand(commandObject){

  var temp = JSON.parse(JSON.stringify(commandObject));

  // Check if the device command format is valid
  if (!(temp.hasOwnProperty("device_type") && temp.hasOwnProperty("device_ID") && temp.hasOwnProperty("command"))){
    console.log("Invalid command format...");
    return 'NULL';
  }

  // Check if command and device are valid
  var command = checkDevice(temp);
  if (command === 'NULL') return 'NULL';

  var validCommand = '{"device_type":"' + temp.device_type + '", "device_ID":"' + temp.device_ID + '", "command":"' + temp.command + '"}'; 

  // Return repackaged JSON string
  return validCommand; 

};

/* Main Program */

/**
 * @brief Handle HTTP request, parse command, then publish to MQTT
 * @param HTTP request object
 * @returns None
 */

// Start listening to HTTP requests
server.on('request', (request, response) => {

    const { headers, method, url } = request;

    let body = [];

    // Scrap the request if not POST
    if(!(request.method === 'POST')){
      response.writeHead(413, 'Invalid HTTP request to server');
      response.end();
      console.error('Invalid HTTP request to server');
      return;
    }

    // TODO: Scrap the request if URL is not from webapp

    request.on('error', (err) => {
      console.error(err);

    }).on('data', (chunk) => {

      // Prevent flooding attack with JSON string
      if(body.length > 200){
        response.writeHead(413, 'Request entity too large');
        response.end();
        return;
      }

      body.push(chunk);
    }).on('end', () => {

    body = Buffer.concat(body).toString();
    console.log("\nRequest size: " + request.length + ", Body size: " + body.length);

    // Deserialize into JSON object
    try{
      var webAppCommand = JSON.parse(body);
    }
    catch (err){
      response.writeHead(400, 'Invalid JSON body within request');
      response.end();
      console.error(err);
      return;
    }

    console.log("Input JSON: " + JSON.stringify(webAppCommand));
    console.log("Device Type: " + webAppCommand.device_type + ", Device ID: " + webAppCommand.device_ID + ", Command: " + webAppCommand.command);

    // Process device command contained in JSON string
    var validCommand = processCommand(webAppCommand);

    if(validCommand === 'NULL'){ 
      response.writeHead(400, 'Invalid device/command within request');
      response.end();
      return;
    } 

    console.log("Output JSON: " + validCommand);

    // Publish the valid command over to MQTT topic
    mqttClient.subscribe(topic, function(err){
      if (err) throw err;
      mqttClient.publish(topic, validCommand);

      // Unsubscribe when done
      mqttClient.unsubscribe(topic, function(err){
        if (err) throw err;
      });
    });

    // Let the client know we got the request
    response.writeHead(200, '{"Content-Type": "application/json"}');
    response.write('{"response":"OK"}');
    response.end();
    });
  }).listen(8080); // Activate server, listening on port 8080.