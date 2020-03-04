const React = require("react");
const style = require('../public/style.css');

function Block(props) {

  return (
    <button className={(props.value === '/') ? "square_p1" : "square_p2"} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

module.exports = Block;