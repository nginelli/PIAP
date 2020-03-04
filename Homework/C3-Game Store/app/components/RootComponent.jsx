const React = require("react");
const squares = require("./squares.jsx");
const board = require("./board.jsx");
const style = require('../public/style.css');

// const ClockFace = require("./ClockFace");
// const utils = require("../logic/utils.js");


/* the main page for the index route of this app */
const RootComponent = function() {
  return (
    <div>
      <Board />
    </div>
  );
}

module.exports = RootComponent;



// const RootComponent = function() {
//   return (
//     <div>
//       <h1>Hello!</h1>
//       <h2>A random number is {utils.randomNumber()}</h2>

//       <p>Your app here</p>

//       <ClockFace language="fr" />
//     </div>
//   );
// }

// module.exports = RootComponent;