// Initialize dependencies
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://127.0.0.1:1883');

var topic = "sensors/incoming_data";

var object = "Rando";

console.log("Subscribing to topic");
client.subscribe(topic, function(err){
	if(!err){

        console.log("Reading message from topic");
		client.on('message', function(topic, message){
          	object = JSON.parse(message.toString());
		console.log("Type: " + object.device_type +", ID: ", + object.device_ID + ", Value: " + object.value);
		})
	}
})

