const React = require("react");
const Component = React.Component;


class Color extends Component {
  render() {
    const divStyle = {
      backgroundColor: this.props.name,
      color: 'white',
      fontSize: '20px',
      height: '100px',
      width: '100px'
    }
    return (
      <div style={divStyle}>{this.props.name}</div>
    )
  }
}

class Animal extends Component {
  render() {
    const divStyle = {
      fontSize: '20px',
      height: '100px',
      width: '100px',
      border: '1px solid black',
      borderRadius: '50%'
    }
    return (
      <div style={divStyle}>{this.props.name}</div>
    )
  }
}

module.exports = {
  Color: Color,
  Animal: Animal
}