import React, { Component } from 'react';
import classnames from 'classnames'
import style from './column.module.css'
import Cell from '../Cell'

class Column extends Component {
  static defaultProps = {
    value: [],
  }

  render() {
    const {value, index: rowIndex} = this.props
    return (
      <div className={classnames(style.col)}>
        {value.map((col, index)=>(
          <Cell key={index} value={col} index={index} position={{x:rowIndex, y:index}}/>
        ))}
      </div>
    );
  }
}

export default Column;
