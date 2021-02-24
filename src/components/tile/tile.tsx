import './style.scss';

type TileProps = {
  number: number | null,
  row: number,
  column: number,
}
const Tile = ({number, row, column}: TileProps) => {
  const classes = `tile position_${row}_${column} color${number}`;
  const displayValue = number || '';
  return (
    <div className={classes}>
      <span>{displayValue}</span>
    </div>
  )
  
}

export default Tile;
