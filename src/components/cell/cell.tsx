import './style.scss';

type CellProps = {
  row: number,
  column: number,
}

const Cell = ({ row, column }:CellProps) => {

  const classes = `cell position_${row}_${column}`;
  const styles = {
    top: `${11 * row + 0.5}rem`,
    left: `${11 * column + 0.5}rem`,
  }

  return (
    <div className={classes} style={styles}></div>
  )
}

export default Cell;
