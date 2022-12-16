import React from "react";

export default class Tooltip extends React.Component {
  render() {
    if (this.props.selectedTree) {
      const { selectedTree } = this.props;
      const width = 50;
      const height = 30;
      const baseX = selectedTree.x + 10 + width < 480 ? selectedTree.x + 10 : selectedTree.x - 10 - width;
      const baseY = selectedTree.y + 10 + height < 480 ? selectedTree.y + 10 : selectedTree.y - 10 - height;
      return <>{this.props.selectedTree
        ? (<>
          <rect rx="4px" ry="4px" width="50px" height="30px" fill="rgba(0, 0, 0)" x={baseX} y={baseY} />
          <text fontSize="20px" fontWeight="500" fill="#fff" x={baseX + 8} y={baseY + 21}>{selectedTree.yeild}</text>
          </>)
        : null
      }</>
    }
  }
}