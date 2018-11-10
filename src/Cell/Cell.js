import React, { Component } from 'react';
import classnames from 'classnames'
import style from './cell.module.css'

class Cell extends Component {
  render() {
    const {value} = this.props
    return (
      <div className={classnames(style.cell, {[style.hidden]: value===undefined})}>
        <div className={classnames(style.content)}>
          <div className={classnames(style.left)} />
          <div className={classnames(style.middle)}>{value||''}</div>
          <div className={classnames(style.right)} />
        </div>
      </div>
    );
  }
}

export default Cell;
