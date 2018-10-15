import React, { Component } from 'react';
import classnames from 'classnames'
import style from './cell.module.css'

class Cell extends Component {
  static defaultProps = {
    value: [],
  }

  render() {
    const {value} = this.props
    return (
      <div className={classnames(style.cell)}>
        <div className={classnames(style.left)} />
        <div className={classnames(style.content)}>{value}</div>
        <div className={classnames(style.right)} />
      </div>
    );
  }
}

export default Cell;
