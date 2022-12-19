import React from "react";

export default class Container extends React.Component {
  render() {
    const style = {
      with: '764px',
      height: '573px',
      marginTop: '20px'
    }
    return <div style={style}>{this.props.children}</div>
  }
}
