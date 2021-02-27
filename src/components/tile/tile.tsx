import { useContext } from 'react';
import { Transition } from 'react-transition-group';
import { TileProps, TransitionTypes, } from '../../types';
import ConfigContext from '../configContext';
import './style.scss';

const Tile = ({tile}: TileProps) => {
  const { animationSpeed } = useContext(ConfigContext);
  const transitionStyles:TransitionTypes = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };
  const defaultStyle = {
    transition: `all ${animationSpeed}ms ease-out`,
  }
  
  const { row, column, value, isVisible } = tile;
  const visible = isVisible ? 'visible' : '';
  const classes = `tile position_${row}_${column} color${value} ${visible}`;
  const displayValue = value || '';
  return (
    <Transition in={isVisible} appear={true} timeout={300} >
      {(state) => (
          <div 
            className={classes}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
          }}>
            <span>{displayValue}</span>
          </div>
      )}
    </Transition> 
  )
}

export default Tile;
