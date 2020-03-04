// server.js

// init project
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();

// app.get("/", (req, res) => {
//   res.send("You did it, you made a web page");
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

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

// // listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
