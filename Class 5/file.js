//dht/sensor.js

const sensor = require("node-dht-sensor").promises;

//Sensor model 22, gpio pin 4 
sensor.read(22, 4).then((reading) => {
	const temp = reading.temperature; 
	const humid = reading.humidity; 
	console.log(`Temperature ${temp} humidity ${humid}`);
});