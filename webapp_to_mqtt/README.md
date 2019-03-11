# How to setup this project
- Run 'npm install'. This should install dependecies

# How to use this project:
- Open a terminal (bash 1)
- Subscribe to topic using 'mosquitto_sub -t "sensors/commands"'
- Open another terminal (bash 2)
- Navigate to project folder /post_to_mqtt
- Review code
- Run "npm test" on bash 2
- Open Postman
- Configure Postman to send JSON strings of varying types
- Use Postman to send JSON string to URL: 0.0.0.0:8080
- Check output of bash 1 and 2
  * If JSON string and key/value pairs are valid, output should appear on bash 1 and 2
  * Else, an error describing the issue is shown on bash 1