const express = require("express");
const { randomName, randomPlace } = require("./chance");
const port = process.env.PORT || 3000;
const fs = require("fs");

// Create an instance of the express application
const app = express();

// Serve the public directory as static
app.use(express.static("public"));
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

let counter = 0;
// let name = null;

app.get("/", (req, res) => {
    counter++;
    let htmldoc = fs.readFileSync("./templates/index.html", "utf8");
    htmldoc = htmldoc.replace("%%%VIEWS%%%", counter);
    res.send(
        htmldoc
    );
});

// You can use replace to pretend like you're using React
app.get("/door", (req, res) => {
    const newName = randomName();
    const newAddress = randomPlace();
    let htmldoc = fs.readFileSync("./templates/door.html", "utf8");
    htmldoc = htmldoc.replace("%%%NAME%%%", newName);
    htmldoc = htmldoc.replace("%%%PLACE%%%", newAddress);
    res.send(
        htmldoc
    );
});

app.get("/window", (req, res) => {
    const newName = randomName();
    let htmldoc = fs.readFileSync("./templates/window.html", "utf8");
    htmldoc = htmldoc.replace("%%%VIEWS%%%", newName);
    res.send(
        htmldoc
    );
});

app.get("/set-name", (req, res) => {
    let htmldoc = fs.readFileSync("./templates/set-name.html", "utf8");
    res.send(
        htmldoc
    );
});

app.get("/inventory", (req, res) => {
    counter++;
    let htmldoc = fs.readFileSync("./templates/inventory.html", "utf8");
    htmldoc = htmldoc.replace("%%%VIEWS%%%", counter);
    res.send(
        htmldoc
    );
});

app.post("/set-name", (req, res) => {
    const suggestion = req.body.username;
});

app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
});