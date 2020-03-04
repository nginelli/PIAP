const React = require("react");
const ClockFace = require("./ClockFace");
const utils = require("../logic/utils.js");


/* the main page for the index route of this app */
const RootComponent = function() {
  return (
    <div>
      <h1>Hello!</h1>
      return <h1>A random number is {utils.randomNumber()}</h1>

      <p>Your app here</p>

      <ClockFace language="fr" />
    </div>
  );
}

module.exports = RootComponent;