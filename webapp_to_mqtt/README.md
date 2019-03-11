# How to setup this module
- Make sure that the Pi has _Node.js_ and _npm_ packages installed
- Run `npm install`. This should resolve dependecies listed in `package.json`

# How to test this module:
- Open a terminal (bash 1)
- Subscribe to topic using `mosquitto_sub -t "sensors/commands"`
- Open another terminal (bash 2)
- Navigate to project folder by typing `cd post_to_mqtt`
- Run `npm test` on bash 2
- Open another terminal (bash 3)
- Run `node client.js'
- Check output of bash 1 and 2
  * If JSON string and key/value pairs are valid, output should appear on bash 1 and 2
  * Else, an error describing the issue is shown on bash 2

# Example output
### Succesful command entry
- Server terminal
```
blah@blah:~/post_to_mqtt$ npm test

> post_to_mqtt@1.0.0 test /home/animeman/Desktop/post_to_mqtt
> node post_mqtt_1.1.js


Request size: undefined, Body size: 69
Input JSON: {"device_type":"sonoff","device_ID":"sonoff-42069666","command":"ON"}
Device Type: sonoff, Device ID: sonoff-42069666, Command: ON
Output JSON: {"device_type":"sonoff", "device_ID":"sonoff-42069666", "command":"ON"}
^C

```
- MQTT terminal
```
blah@blah:~/post_to_mqtt$ mosquitto_sub -t "sensors/commands"
{"device_type":"sonoff", "device_ID":"sonoff-42069666", "command":"ON"}
```
- Client terminal
```
blah@blah:~/Desktop/post_to_mqtt$ node client.js 
{"response":"OK"}
```
### Erroneous entry (Bad JSON, unsupported device, unsupported commands)
- Server terminal
```
blah@blah:~/post_to_mqtt$ npm test

> post_to_mqtt@1.0.0 test /home/animeman/Desktop/post_to_mqtt
> node post_mqtt_1.1.js


Body size: 69
Input JSON: {"device_type":"sensor","device_ID":"sensor-42069666","command":"ON"}
Device Type: sensor, Device ID: sensor-42069666, Command: ON
Unsupported device

```

