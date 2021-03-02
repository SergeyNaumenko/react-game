import './style.scss';

type CellProps = {
  row: number,
  column: number,
  width: number,
  height: number,
}

const Cell = ({ row, column, width, height }:CellProps) => {

  const classes = `cell position_${row}_${column}`;
  const spaceX = row === 0 ? 0 : 5;
  const spaceY = column === 0 ? 0 : 5;
  const styles = {
    top: `${(width + spaceX) * row}px`,
    left: `${(height + spaceY) * column}px`,
    width: `${width}px`,
    height: `${height}px`,
  }

  return (
    <div className={classes} style={styles}></div>
  )
}

export default Cell;
