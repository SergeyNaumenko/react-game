import { Transition } from 'react-transition-group';
import './style.scss';
import { TileType } from '../../types';

type TileProps = {
  tile: TileType
}

type TransitionTypes = {
  [key:string] : any,
}
const transitionStyles:TransitionTypes = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

const Tile = ({tile}: TileProps) => {
  const { key, row, column, value, isVisible, isNew } = tile;
  const visible = isVisible ? 'visible' : '';
  const classes = `tile position_${row}_${column} color${value} ${visible}`;
  const displayValue = value || '';
  return (
    <Transition in={isNew} appear={true} timeout={300} >
      {(state) => (
          <div 
            className={classes}
            style={{
            ...transitionStyles[state]
          }}>
            <span>{displayValue}</span>
          </div>
      )}
    </Transition> 
  )
}

export default Tile;
