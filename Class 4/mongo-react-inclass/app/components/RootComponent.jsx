const React = require("react");
const ClockFace = require("./ClockFace");
const TwitterList = require("./TwitterList");
const TwitterForm = require("./TwitterForm");

const dummyData = [
	{user: "Alex", message: "1"}
	{user: "Alexa", message: "yo"}
	{user: "Alex", message: "2"}
];


/* the main page for the index route of this app */
const RootComponent = function() {
  return (
    <div>
      <h1>Hello!</h1>

      <p>Your app here</p>

      <ClockFace language="fr" />

      <TwitterForm />
      <TwitterList tweets ={dummyData}/>

    </div>
  );
}

module.exports = RootComponent;