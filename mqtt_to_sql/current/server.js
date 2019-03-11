// Initialize dependencies
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://127.0.0.1');

// Start using the client
console.log("Subscribing to topic");

var topic = 'sensors/incoming_data';

// Subscribe to the topic
client.subscribe(topic, function (err){

    // If connection successful, publish to the topic
	if(!err){

		// Entry follows format, unsupported sensor type
		client.publish(topic, '{"device_type":"button", "device_ID":"id1", "value":"1.0"}');

		// Entry follows format, supported sensor type
		client.publish(topic, '{"device_type":"thermometer", "device_ID":"id1", "value":"27.0"}');

		// Entry follows format, supported sensor type, invalid value
		client.publish(topic, '{"device_type":"thermometer", "device_ID":"id1", "value":"invalid"}');

		client.end();
	}
})
