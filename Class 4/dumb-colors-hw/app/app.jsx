const React = require("react");
// const ReactDOM = require("react-dom");
const Component = React.Component;
require('./App.css');

/* Import Components */
var {Color} = require('./Components/Shapes');
var {Animal} = require('./Components/Shapes');

// ReactDOM.render(<Shapes/>, document.getElementById("main"));



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="colors">
          <Color name="red"/>
          <Color name="green"/>
          <Color name="blue"/>
        </div>
      </div>
    );
  }
}
module.exports = App;