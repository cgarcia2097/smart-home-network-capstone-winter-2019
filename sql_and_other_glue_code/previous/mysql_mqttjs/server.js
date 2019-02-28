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

		// Legit entry
		client.publish(topic, '{"device_type":"button", "device_ID":"id1", "value":1}');

		// Empty string
                client.publish(topic, '');

		// Empty JSON String
                client.publish(topic, '{}');

		// Missing device_ID
		client.publish(topic, '{"device_type":"button", "value":1}');

		// Missing device_type
		client.publish(topic, '{"device_ID":"id1", "value":1}');

		// Missing device_ID and device_type
		client.publish(topic, '{"value":1}');

		// Missing device_ID
		client.publish(topic, '{"device_type":"button", "value":1}');

		// Another legit entry
		client.publish(topic, '{"device_type":"button", "device_ID":"id1", "value":2}');
                client.publish(topic, '{"device_type":"button", "device_ID":"id1", "value":3}');
                client.publish(topic, '{"device_type":"button", "device_ID":"id1", "value":4}');
                client.publish(topic, '{"device_type":"button", "device_ID":"id1", "value":5}');
                client.publish(topic, '{"device_type":"button", "device_ID":"id1", "value":6}');
                client.publish(topic, '{"device_type":"button", "device_ID":"id1", "value":7}');

		// End program
		client.end();
	}
})
