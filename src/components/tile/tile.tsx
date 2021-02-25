import './style.scss';
import { TileType } from '../../types';

type TileProps = {
  tile: TileType
}
const Tile = ({tile}: TileProps) => {
  const { key, row, column, value, isVisible } = tile;
  const visible = isVisible ? 'visible' : '';
  const classes = `tile position_${row}_${column} color${value} ${visible}`;
  const displayValue = value || '';
  return (
    <div className={classes}>
      <span>{displayValue}</span>
    </div>
  )
  
}

export default Tile;
