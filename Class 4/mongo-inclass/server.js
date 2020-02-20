//1 require express
const express = require.("express");
const fs = require("fs");
const path = require("path");

// make the app 
const app = express();

// middleware like app.use
app.get("/", (req, res) => {
	// Read data in our file 
	const filepath = path.join(__dirname, "data.json");
	const contents = fs.readFileSync(filepath, "utf8");

	// Update the count 


	// Write the file 


	// Save the result 



	res.send("hi hi");
});

//4 listen 
app.listen(3000, () => {
	console.log("listening");
});
