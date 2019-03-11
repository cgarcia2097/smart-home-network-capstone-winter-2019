// Initialize dependencies
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://127.0.0.1');

var topic = 'sensors/incoming_data';

// Start using the client
console.log("Subscribing to topic");

	// Subscribe to the topic
	client.subscribe(topic, function (err){

		// If connection successful, publish to the topic
		if(!err){
			client.publish(topic, '{"device_type":"temperature", "device_ID":"type1", "value":1}');
			client.end();
		}
	})

