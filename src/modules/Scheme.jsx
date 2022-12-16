import React from "react";

export default class Scheme extends React.Component {
  render() {
    return <>
      {this.props.state.trees.map((tree) => (
        <circle
        key={tree.id}
        onMouseEnter={this.props.onMouseEnter(tree.id)}
        onMouseLeave={this.props.onMouseLeave(tree.id)}
        style={this.props.style}
        cx={tree.x}
        cy={tree.y}
        r={this.props.state.treeR}
        fill={`rgb(100, ${255 - (tree.yeild - 120) * 6}, 100)`}
        stroke={this.props.selectedTree === tree ? 'black' : null}>
        </circle>
      ))}
    </>
  }
};
