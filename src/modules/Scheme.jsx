import React from "react";

export default class Scheme extends React.Component {
  render() {
    return <>
      {this.props.state.trees.map((tree) => <circle style={this.props.style} cx={tree.x} cy={tree.y} r="7.5" fill={`rgb(0, ${tree.yeild}, 0)`}></circle>)}
    </>
  }
};
