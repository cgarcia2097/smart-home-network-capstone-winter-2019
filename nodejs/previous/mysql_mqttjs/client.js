/**
	File: 		client.js
	Date: 		Feb 25, 2019
	Author: 	Charles Garcia
	Description: 	Reads an MQTT topic, verifies if it is a valid JSON object, then pushes JSON's 
			attributes to an SQL database.
*/

// Initialize dependencies
const mqtt = require('mqtt');
const mysql = require('mysql');

// MQTT-related info
var topic = "sensors/incoming_data";
var object = 'NULL';

// Connect to broker
const client = mqtt.connect('mqtt://192.168.5.110:1883');

// Configure and connect to MySQL database
const sqldb = mysql.createConnection({
	host: "localhost",
	user: "mqtt_to_sql",
	password: "Salomondrinis110%LOCO",
	database: "sensor"
})

sqldb.connect(function(err){
	if(err) throw err;
	console.log("Connected to sensor database... ");
})

// Subscribe to the topic
console.log("Subscribing to topic... ");
client.subscribe(topic, function(err){

	if(!err){
            // Read Message from topic
            console.log("Reading message from topic ...");

            client.on('message', function(topic, message){
            console.log("\nString received: " + message.toString());

                if(message.toString() === "END"){

                    // Unsubscribe from MQTT and terminate connection
                    client.end();
                    console.log("Unsubscribing from topic..");

                    // Terminate connection to SQL database
                    sqldb.end();
                    console.log("Disconnecting from database...");

                    // TODO: Other termination stuff here

                    // Exit the program
                    console.log("Exiting Javascript program...");
                    process.exit(0);
                }
		else if (message.toString() === ""){
			console.log("String is empty");
		}
                else{
                    try{
                        // Store MQTT message as JSON object
                        object = JSON.parse(message.toString());
                    }
                    // Error handling
                    catch (err){
                        console.log("Error: " + err);
			return;
                    }

                     // Check if the JSON object representing sensor data is valid
                     if (!(object.hasOwnProperty("device_type") && object.hasOwnProperty("device_ID") && object.hasOwnProperty("value"))){
			console.log("Invalid sensor format...");
			return;
                     }

                      console.log("Device Type: " + object.device_type + ", Device ID: " + object.device_ID + ", Value: " + object.value + "\n");

                      // Store JSON attributes into SQL query
                      var sql = "INSERT INTO sensor_db (time, device_type, device_ID, value) VALUES (CURRENT_TIMESTAMP,?)";
                      var entry = [object.device_type, object.device_ID, object.value];

                      // Query the database
                      sqldb.query(sql, [entry], function(err,result){
	                      if (err) throw err;
        	              console.log("Number of records inserted: " + result.affectedRows);
                      });
                }
            });
        }
})

