import React from "react";
import Scheme from "./Scheme";
import NormalDistribution from "normal-distribution";

export default class Field extends React.Component {
  constructor(props) {
    super(props);
    const arr = [];
    for (let i = 0; i < 576; i += 1) {
      const val = Math.round(Math.random() * (180 - 120) + 120);
      arr.push({
        yeild: val,
        x: 7.5 + (i - Math.floor(i / 24) * 24) * 15,
        y: 7.5 + Math.floor(i / 24) * 15,
      })
    };
    this.state = {
      state: 'field',
      trees: arr,
    }
  }
  toCurve = () => {
    const nd = new NormalDistribution(150, 10);
    const newArr = this.state.trees.map((tree, i) => {
      tree.x = (tree.yeild - 120) * 6
      tree.y = 360 - nd.pdf(tree.yeild) * 9000;
      return tree;
    })
    this.setState({
      state: 'curve',
      trees: newArr,
    })
  }
  toField = () => {
    const newArr = this.state.trees.map((tree, i) => {
      tree.x = 7.5 + (i - Math.floor(i / 24) * 24) * 15;
      tree.y = 7.5 + Math.floor(i / 24) * 15;
      return tree;
    });
    this.setState({
      state: 'field',
      trees: newArr,
    })
  }
  changeState = () => {
    if (this.state.state === 'field') {
      this.toCurve();
    }
    if (this.state.state === 'curve') {
      this.toField();
    }
  }
  render() {
    const animation = {
      transitionProperty: 'cx, cy',
      transitionDuration: '1.5s'
    }
    return <>
      <svg width="360" height="360"><Scheme style={animation} state={this.state} /></svg>
      <div><button onClick={this.changeState}>Поменять</button></div>
    </>
  }
}