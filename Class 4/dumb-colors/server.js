// server.js

// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// const mongouri = process.env.MONGODB_URI || "mongodb://localhost:27017/dumbnicole";
// const mongo = require("mongodb").MongoClient; 

// let dbclient;

const dummyData = [
  {user: "Alex", message: "1"},
  {user: "Alexa", message: "yo"},
  {user: "Alex", message: "2"}
];


// Special piece for running with webpack dev server
if (process.env.NODE_ENV === "development") {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});


app.get("/api/tweets", async (req, res) => {
  //json sends clear data that is specific to json 
  res.json(dummyData);

});

app.get("/counter", async (req, res) => {
  // Get the collection
  const collection = await dbclient.collection("siteinfo");

  // Find the document you care about 
  const item = await collection.findOne( {} );

  //Get your data out of the item 
  const pageviews = item ? item.pageviews + 1: 1; 

  //Save back to the database 
  await collection.updateOne({}, {
    $set: {
      pageviews: pageviews
    }
  }, {
    upsert: true
  });


  res.send(`This page has been visited ${pageviews} times`);
});


// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

// 
// listen for requests :)
// mongo.connect(mongouri, {
//   useNewUrlParser: true, 
//   useUnifiedTopology: true
// }).then((client) => {
  
//   dbclient = client.db();

//   const listener = app.listen(port, function () {
//   console.log('Your app is listening on port ' + port);
//   });

// })

