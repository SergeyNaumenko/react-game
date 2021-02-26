import React, { useEffect, useState } from 'react';
import { isNull } from 'util';
import {
  keyLeft,
  keyUp,
  keyRight,
  keyDown,
  keyCtrl,
  keyQ,
} from '../../constants';
import Cell from '../cell';
import Tile from '../tile';
import BoardActions  from '../../utils/BoardActions';

import './style.scss';
import { BoardType } from '../../types';

const Board = () => {
  const boardSize = 4;
  const cells = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
  const defaultBoard = {
    matrix: cells,
    tiles: [],
  }

  const [board, setBoard] = useState<BoardType>(defaultBoard);
  
  const makeAction = (direction: string) => {
    setBoard(({matrix, tiles}) => {
      console.log('make action')
      const boardActions = new BoardActions(matrix, tiles);
      const { matrix: newMatrix, tiles: newTiles } = boardActions.makeAction(direction);
      return {
        matrix: newMatrix,
        tiles: newTiles,
      };
    })
  }

  const handleKeyDown = (event:any) => {
    const { keyCode } = event;
    switch (keyCode) {
      case keyLeft: {
        makeAction('left');
        break;
      }
      case keyUp: {
        makeAction('top');
        break;
      }
      case keyRight: {
        makeAction('right');
        break;
      }
      case keyDown: {
        makeAction('down');
        break;
      }
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      console.log('remove listener')
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [board]);

  const cellsView = cells.map((row, rowIndex) => {
    return row.map((_, cellIndex) => {
      const key = boardSize * rowIndex + cellIndex;
      return <Cell key={key} row={rowIndex} column={cellIndex}/>
    });
  })

  const tilesView = board.tiles.map((tile, index) => {
    if (!isNull(tile)) {
      return <Tile key={tile.key} tile={tile} />;
    }
    return null;
  });

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <div className='board'>
        { cellsView }
        { tilesView }
      </div>
    </div>
  )
  
}

export default Board;
