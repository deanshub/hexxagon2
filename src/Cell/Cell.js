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
        <div className={classnames(style.content)}>
          <div className={classnames(style.left)} />
          {value}
          <div className={classnames(style.right)} />
        </div>
      </div>
    );
  }
}

export default Cell;
