/**
	File: 		client.js
	Date: 		Feb 25, 2019
	Author: 	Charles Garcia
	Description: 	Reads an MQTT topic, parses into JSON object, verifies if it is a valid JSON object, then pushes JSON's attributes to an SQL database.
*/

// Initialize dependencies
const mqtt = require('mqtt');
const mysql = require('mysql');

// MQTT variables
var topic = "sensors/incoming_data";
var object = 'NULL';

// SQL variables
var sql, entry, sensor_db = "sensor_data";

// Connect to broker
const client = mqtt.connect('mqtt://127.0.0.1:1883');

// Configure MySQL connection
const sqldb = mysql.createConnection({
	host: "localhost",
	user: "smarthome",
	password: "Salomondrinis110%LOCO",
	database: "sensor_data"
});

// Connect to database
sqldb.connect(function(err){
	if(err) throw err;
	console.log("Connected to sensor database... ");
});

// Subscribe to the sensor topic
console.log("Subscribing to topic " + topic);
client.subscribe(topic, function(err){

	if(!err){
        // Read Message from topic
        console.log("Reading message from topic " + topic);

        client.on('message', function(topic, message){
			console.log("\nString received: " + message.toString());

			if(message.toString() === "END"){

				// Unsubscribe from MQTT and terminate connection
				client.end();
				console.log("Unsubscribing from topic " + topic);

				// Terminate connection to SQL database
				sqldb.end();
				console.log("Disconnecting from database" );

				// TODO: Other termination stuff here

				// Exit the program
				console.log("Exiting Javascript program");
				process.exit(0);
			}
			else if (message.toString() === ""){
				console.log("String is empty");
			}
			else{

				try{
					//Store MQTT message as JSON object
					object = JSON.parse(message.toString());
				}
				catch (err){
					console.log("Error: " + err);
					return;
				}

				// Check if the JSON object representing sensor data is valid
				if (!(object.hasOwnProperty("device_type") && object.hasOwnProperty("device_ID") && object.hasOwnProperty("value"))){
					console.log("Invalid sensor format");
					return;
				}

            	console.log("Device Type: " + object.device_type + ", Device ID: " + object.device_ID + ", Value: " + object.value + "\n");
				
				// Parse device value based on sensor type
				var temp = parseSensor(object);

				// Verify if parsing is a success; if not, ditch this entry
				if(temp === 'NULL'){
					return;
				}

				// Store JSON attributes into SQL query
				// Change the table being used when switching hosts
				var sql = "INSERT INTO " + sensor_db +" (time, device_type, device_ID, value) VALUES (CURRENT_TIMESTAMP,?)";

				// Parse sensor value based on sensor type
				var entry = [object.device_type, object.device_ID, temp];

				// Query the database
				sqldb.query(sql, [entry], function(err,result){
					if (err) throw err;
					console.log("Number of records inserted: " + result.affectedRows);
				});
			}
		});   
    }
})

/**
 * @brief Parse values into float if device type is valid and supported
 * @param {*} sensorObject 
 * @returns Parsed value if success, 'NULL' if invalid
 */
function parseSensor(sensorObject){
	var temp;

	// If invalid, don't store
	if(sensorObject.value === "invalid") {
		console.log("Sensor value is invalid");
		return 'NULL';
	}

	// Parse value based on the device type
	switch(sensorObject.device_type){

		case "thermometer":
			console.log("Successful entry");
			temp = parseFloat(sensorObject.value);
			break;

		case "hygrometer":
			console.log("Successful entry");
			temp = parseFloat(sensorObject.value);
			break;

		// Unsupported sensors
		default:
			console.log("Sensor is unsupported");
			temp = 'NULL';
			break;
	}

	return temp;
}
