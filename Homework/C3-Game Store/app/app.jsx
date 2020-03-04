const React = require("react");
const ReactDOM = require("react-dom");
const style = require('../public/style.css');


/* Import Components */
const RootComponent = require("./components/RootComponent");

ReactDOM.render(<RootComponent/>, document.getElementById("main"));