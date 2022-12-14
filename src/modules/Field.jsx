import React from "react";
import Scheme from "./Scheme";
import NormalDistribution from "normal-distribution";

export default class Field extends React.Component {
  constructor(props) {
    super(props);
    const treeR = 10;
    const arr = [];
    for (let i = 0; i < 576; i += 1) {
      const val = Math.round(Math.random() * (180 - 120) + 120);
      arr.push({
        yeild: val,
        x: treeR + (i - Math.floor(i / 24) * 24) * treeR * 2,
        y: treeR + Math.floor(i / 24) * treeR * 2,
      })
    };
    this.state = {
      treeR: treeR,
      state: 'field',
      trees: arr,
    }
  }
  toCurve = () => {
    const nd = new NormalDistribution(150, 10);
    const newArr = this.state.trees.map((tree, i) => {
      tree.x = (tree.yeild - this.state.treeR * 48 / 4) * 8
      tree.y = this.state.treeR * 48 - nd.pdf(tree.yeild) * this.state.treeR * 48 * 24;
      return tree;
    })
    this.setState({
      state: 'curve',
      trees: newArr,
    })
  }
  toField = () => {
    const newArr = this.state.trees.map((tree, i) => {
      tree.x = this.state.treeR + (i - Math.floor(i / 24) * 24) * this.state.treeR * 2;
      tree.y = this.state.treeR + Math.floor(i / 24) * this.state.treeR * 2;
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
    const buttonTest = this.state.state === 'field' ? 'Туда' : 'Сюда';
    return <>
      <svg width={this.state.treeR * 48} height={this.state.treeR * 48}><Scheme style={animation} state={this.state} /></svg>
      <div><button onClick={this.changeState}>{buttonTest}</button></div>
    </>
  }
}