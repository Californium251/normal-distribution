import React from "react";
import _ from 'lodash';
import Scheme from "./Scheme";
import Tooltip from "./Tooltip";
import NormalDistribution from "normal-distribution";
import "../fonts/YS Text-Bold.ttf";

export default class Field extends React.Component {
  constructor(props) {
    super(props);
    const treeR = 10;
    const arr = [];
    for (let i = 0; i < 576; i += 1) {
      const val = Math.round(Math.random() * (180 - 120) + 120);
      arr.push({
        id: _.uniqueId(),
        yeild: val,
        x: 284 + treeR + (i - Math.floor(i / 24) * 24) * treeR * 2,
        y: 93 + treeR + Math.floor(i / 24) * treeR * 2,
      })
    };
    this.state = {
      buttonHover: false,
      selectedTree: null,
      treeR: treeR,
      state: 'field',
      trees: arr,
    }
  }
  toCurve = () => {
    const nd = new NormalDistribution(150, 10);
    const newArr = this.state.trees.map((tree, i) => {
      tree.x = 284 + (tree.yeild - this.state.treeR * 48 / 4) * 8
      tree.y = 93 + this.state.treeR * 48 - nd.pdf(tree.yeild) * this.state.treeR * 48 * 24;
      return tree;
    })
    this.setState({
      state: 'curve',
      trees: newArr,
    })
  }
  toField = () => {
    const newArr = this.state.trees.map((tree, i) => {
      tree.x = 284 + this.state.treeR + (i - Math.floor(i / 24) * 24) * this.state.treeR * 2;
      tree.y = 93 + this.state.treeR + Math.floor(i / 24) * this.state.treeR * 2;
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
  onMouseEnter = (id) => () => {
    const selectedTree = this.state.trees.filter((tree) => tree.id === id)[0];
    this.setState({ selectedTree });
  };
  onMouseLeave = (id) => () => {
    this.setState({ selectedTree: null })
  }
  onButtonHover = () => {
    this.setState({ buttonHover: !this.state.buttonHover })
  }
  render() {
    const animation = {
      transitionProperty: 'cx, cy',
      transitionDuration: '1.5s'
    }
    const buttonTest = this.state.state === 'field' ? 'Туда' : 'Сюда';
    return <>
      <svg width={764} height={573}>
        <text font-family="ys-text-regular, sans-serif" fontSize="24px" fontWeight="500" x="10" y="50" width="50px">Урожайность деревьев</text>
        <text font-family="ys-text-regular, sans-serif" fontSize="24px" fontWeight="500" x="10" y="82" width="50px">укладывается</text>
        <text font-family="ys-text-regular, sans-serif" fontSize="24px" fontWeight="500" x="10" y="114" width="50px">в нормальное</text>
        <text font-family="ys-text-regular, sans-serif" fontSize="24px" fontWeight="500" x="10" y="146" width="50px">распределение</text>
        <Scheme
        style={animation}
        state={this.state}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        />
        <Tooltip selectedTree={this.state.selectedTree} />
        <g onClick={this.changeState} onMouseEnter={this.onButtonHover} onMouseLeave={this.onButtonHover} cursor="pointer">
          <rect x="10" y="190" width="200px" height="40px" fill={this.state.buttonHover ? '#000' : '#fff'} stroke="black" rx="8px" ry="8px" />
          <text font-family="ys-text-regular, sans-serif" x="90" y="215" fill={!this.state.buttonHover ? '#000' : '#fff'}>{this.state.state === 'field' ? 'Туда' : 'Сюда'}</text>
        </g>
      </svg>
    </>
  }
}
