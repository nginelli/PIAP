const express = require("express");
const { randomName, randomPlace, randomColor } = require("./chance");
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

function makeContent(color, title, text, options) {
    let htmldoc = fs.readFileSync("./templates/index.html", "utf8");
    htmldoc = htmldoc.replace("%%%COLOR%%%", color);
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
        "<a href=/blue>Go to blue</a>",
        "<a href=/red>Go to red</a>"
    ];
    options.push("<a href=/inventory>Your colors</a>");
    res.send(
        makeContent(
            "yellow",
            "yellow",
            "You're standing in the sun. You can swim in the sea or start a fire.",
            options
        )
    );
});

app.get("/blue", (_, res) => {
    lastLocation = "blue";
    let options = ["<a href=/yellow>Go back to yellow</a>"];
    options.push("<a href=/wildcard>Wildcard</a>");
    options.push("<a href=/inventory>Your Colors</a>");
    res.send(
        makeContent(
            "blue",
            "blue",
            "You're in the sea.",
            options
        )
    );
});

app.get("/red", (_, res) => {
    lastLocation = "red";
    let options = ["<a href=/yellow>Go back to yellow</a>"];
    let text = "You're standing in fire.";
    if (inventory.length === 0) {
        text += "Theres an option to multiply colors";
        options.push("<a href=/multiply>Pick up the multi</a>");
    }
    options.push("<a href=/inventory>Your colors</a>");
    res.send(
        makeContent(
            "red",
            "red",
            text,
            options
        )
    );
});

app.get("/inventory", (_, res) => {
    let text = "You dont have any colors yet!";
    if (inventory.length > 0) {
        text = "You have multiply powers";
    }
    let returnAddress = "yellow";
    if (!!lastLocation) returnAddress = lastLocation;
    res.send(
        makeContent(
            "brown",
            "colors",
            text,
            [
                `<a href=/${returnAddress}>Go back</a>`,
            ]
        )
    )
});


app.get("/wildcard", (_, res) => {
    const newColor = randomColor();
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
            "newColor",
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
            green,
            inventory.length > 0 ? "Victory!" : "Nice try",
            text,
            options
        )
    )
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});