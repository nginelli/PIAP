const React = require("react");

function Block(props) {

  return (
    <button className={(props.value === 'I') ? "square_p1" : "square_p2"} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

module.exports = Block;