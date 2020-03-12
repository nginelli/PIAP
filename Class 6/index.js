const express = require("express");

//using object destructuring
//gives us a variable client 
const { Client } = require("node-osc");

//creat an actual client object 
const myClient = new Client("127.0.0.1", "9001");

const app = express();

app.get("/", (req, res) => {
    
    const x = Math.random() * 1080;
    const y = Math.random() * 720;
    const w = Math.random() * 250;
    const h = Math.random() * 250;

    // myClient.send(path, to send, callback)
    myClient.send("/createRectangle", x, y, w, h, () =>{
        res.send("OSC sent successfully");
    });    
});

app.listen(3000, () =>{
    console.log("listening on port 3000")
});
