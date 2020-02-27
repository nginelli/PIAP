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

const locations = [
    {
        name: "yellow",
        template: "yellow.html"
    }
];

// Game state
let inventory = [];
let lastLocation = undefined;

function makeContent(title, text, options) {
    let htmldoc = fs.readFileSync("./templates/index.html", "utf8");
    htmldoc = htmldoc.replace("%%%TITLE%%%", title);
    htmldoc = htmldoc.replace("%%%TEXT%%%", text);
    htmldoc = htmldoc.replace("%%%OPTIONS%%%", options.map(option => `<li>${option}</li>`).join(""));
    return htmldoc;
}

app.get("/", (_, res) => {
    inventory = [];
    lastLocation = "yellow";
    res.redirect("/yellow");
});

app.get("/yellow", (_, res) => {
    lastLocation = "yellow";
    options = [
        "<a href=/blue>Go to sea</a>",
        "<a href=/red>Go to fire</a>"
    ];
    options.push("<a href=/inventory>Your inventory</a>");
    res.send(
        makeContent(
            "yellow",
            "You're standing in the sun. You can swim in the sea or start a fire.",
            options
        )
    );
});

app.get("/blue", (_, res) => {
    lastLocation = "blue";
    let options = ["<a href=/yellow>Go back to the sun</a>"];
    options.push("<a href=/wildcard>Wildcard</a>");
    options.push("<a href=/inventory>Your inventory</a>");
    res.send(
        makeContent(
            "blue",
            "You're in the sea.",
            options
        )
    );
});

app.get("/red", (_, res) => {
    lastLocation = "small";
    let options = ["<a href=/yellow>Go back to the yellow</a>"];
    let text = "You're standing in a small room. Actually, it's so small you're not standing, you're crouching.";
    if (inventory.length === 0) {
        text += " There's a shiny key on the floor.";
        options.push("<a href=/key>Pick up the key</a>");
    }
    options.push("<a href=/inventory>Check your inventory</a>");
    res.send(
        makeContent(
            "Small room",
            text,
            options
        )
    );
});

app.get("/inventory", (_, res) => {
    let text = "There is nothing in your inventory!";
    if (inventory.length > 0) {
        text = "You have a key in your inventory";
    }
    let returnAddress = "yellow";
    if (!!lastLocation) returnAddress = lastLocation;
    res.send(
        makeContent(
            "Inventory",
            text,
            [
                `<a href=/${returnAddress}>Back whence you came</a>`,
            ]
        )
    )
});


app.get("/wildcard", (_, res) => {
    const newColor = randomColor();
    let htmldoc = fs.readFileSync("./templates/door.html", "utf8");
    htmldoc = htmldoc.replace("%%%TITLE%%%", newColor);
    res.send(
        htmldoc
    );

    let text = "You got the random color!";
    if (inventory.length === 0) {
        inventory.push("wildcard");
    } else {
        text = "You already have the random color";
    }
    let returnAddress = "yellow";
    if (!!lastLocation) returnAddress = lastLocation;
    res.send(
        makeContent(
            "wildcard",
            text,
            [
                `<a href=/${returnAddress}>Go back</a>`,
            ]
        )
    )
});

app.get("/green", (_, res) => {
    let text;
    let returnAddress = "yellow";
    let options;
    if (!!lastLocation) returnAddress = lastLocation;
    
    if (inventory.length > 0) {
        text = "You did it!";
        options = [`<a href=/>Start over</a>`];
    } else {
        text = "You need to collect the color";
        options = [`<a href=/${returnAddress}>Go back</a>`];
    }
    res.send(
        makeContent(
            inventory.length > 0 ? "Victory!" : "Nice try",
            text,
            options
        )
    )
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});