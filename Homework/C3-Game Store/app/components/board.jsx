const React = require("react");
const Block = require("./squares.jsx");

function Board(props) {

  //Game state stored in an array, null to start
  const [squares, setSquares] = React.useState(Array(9).fill(null));

  //Player State
  const [player, setPlayer] = React.useState(true);

  //track clicks and seperate the squares
  function trackClick(i) {
    const squaresBoth = squares.slice();

    if (squaresBoth[i] || whoWon(squaresBoth)) {
      return;
    }
    if (player) {
      squaresBoth[i] = 'I';
    } else {
      squaresBoth[i] = 'U';
    }
    setSquares(squaresBoth);
    setPlayer(!player);
  }


  function whoWon(squares) {

    const wins = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    for (var i=0; i<8; i++) {
      var x = wins[i][0]; 
      var y = wins[i][1];
      var z = wins[i][2];
      if (squares[x] === squares[y] && squares[y] === squares[z] && squares[z] !== null && squares[y] !== null && squares[x] !== null) {
        return squares[x];
      }
    }
    return null;
  }


  function showBlock(i) {
    return (<Block value={squares[i]} onClick={() => trackClick(i)}/>);
  }
 
  var status = "'s turn to move";
  const winner = whoWon(squares);

  return (
    <div>
     <div className="column">
        <div className="row">
          {showBlock(0)} {showBlock(1)} {showBlock(2)}
        </div>
        <div className="row">
          {showBlock(3)} {showBlock(4)} {showBlock(5)}
        </div>
        <div className="row">
          {showBlock(6)} {showBlock(7)} {showBlock(8)}
        </div>
      </div>

    <div className="message">
          {(winner) ? ('Winner is ' + winner + '!') : ((player ? 'I' : 'U') + status)}
    </div>
    </div>
  );
}

module.exports = Board;