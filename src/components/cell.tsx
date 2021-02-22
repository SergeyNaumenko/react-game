import React from 'react';
type CellProps = {
  row: number,
  cell: number,
}

const Cell = ({ row, cell }:CellProps) => {

  const classes = `cell position_${row}_${cell}`;

  return (
    <div className={classes}></div>
  )
}

export default Cell;
