//1 require express
const express = require("express");
const fs = require("fs");
const path = require("path");
const promisify = require("util").promisify;

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
// make the app 
const app = express();

// middleware like app.use
app.get("/", async (req, res) => {
	// Read data in our file 
	const filepath = path.join(__dirname, "data.json");

	const contents = await readFileAsync(filepath, "utf8");
	
	const data = JSON.parse(contents); 

	// Update the count 
	data.count++; 

	// Write the file to disk
	const output = JSON.stringify(data);
	await writeFileAsync(filepath, output);

	// Send the result 
	res.send(`You have visited this page ${data.count} times`);
});

//4 listen 
app.listen(3000, () => {
	console.log("listening");
});
