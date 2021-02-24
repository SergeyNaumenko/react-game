import React from 'react';
type CellProps = {
  row: number,
  column: number,
}

const Cell = ({ row, column }:CellProps) => {

  const classes = `cell position_${row}_${column}`;

  return (
    <div className={classes}></div>
  )
}

export default Cell;
