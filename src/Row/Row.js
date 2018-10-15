import React, { Component } from 'react';
import classnames from 'classnames'
import style from './row.module.css'
import Cell from '../Cell'

class Row extends Component {
  static defaultProps = {
    value: [],
  }

  render() {
    const {value} = this.props
    return (
      <div className={classnames(style.row)}>
        {value.map((row, index)=>(
          <Cell key={index} value={row} index={index}/>
        ))}
      </div>
    );
  }
}

export default Row;
