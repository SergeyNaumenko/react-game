import React, { useEffect, useState } from 'react';
import {
  keyLeft,
  keyUp,
  keyRight,
  keyDown,
  keyCtrl,
  keyQ,
} from '../../constants';
import Cell from '../cell';

import './style.scss';

const Board = () => {
  const [board, setBoard] = useState([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]])

  const handleKeyDown = (event:any) => {
    event.preventDefault();
    const { keyCode } = event;
    
    switch (keyCode) {
      case keyLeft: {
        console.log('left')
        break;
      }
      case keyUp: {
        console.log('up')
        break;
      }
      case keyRight: {
        console.log('right')
        break;
      }
      case keyDown: {
        console.log('down')
        break;
      }
    }
  }
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const cells = board.map((row, rowIndex) => {
    return row.map((_, cellIndex) => {
      const key = board.length * rowIndex + cellIndex;
      return <Cell key={key} row={rowIndex} cell={cellIndex}/>
    });
  })

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <div className='board'>
        { cells }
      </div>
    </div>
  )
  
}

export default Board;
