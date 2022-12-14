import React from "react";

export default class Scheme extends React.Component {
  render() {
    return <>
      {this.props.state.trees.map((tree) => <circle style={this.props.style} cx={tree.x} cy={tree.y} r={this.props.state.treeR} fill={`rgb(100, ${(tree.yeild - 120) * 6}, 100)`}></circle>)}
    </>
  }
};
