const React = require("react");
const Block = require("./squares.jsx");
const Board = require("./board.jsx");

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