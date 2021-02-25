import React, { useCallback, useEffect, useState } from 'react';
import { isNumber, isNull } from 'util';
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
import {
  getRandomIndex,
} from '../../utils/utils';

import './style.scss';
import { TileType } from '../../types';

const Board = () => {
  const boardSize = 4;
  const cells = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
  const [board, setBoard] = useState(cells);
  const [tiles, setTiles] = useState<TileType[]>([]);

  const addTile = () => {
    setTiles((tiles) => {
      console.log(tiles)
      const nullIndexes = board.flat()
                            .map((value, index) => isNull(value) ? index : null)
                            .filter((value) => value != null);

      if (nullIndexes.length) {
        const randIndex = nullIndexes[getRandomIndex(nullIndexes.length)];
        if (isNumber(randIndex)) {
          console.log(randIndex)
          const row = Math.trunc(randIndex / boardSize);
          const column = randIndex % boardSize;
          const newTile = createTile(2, row, column);
          return [...tiles, newTile];
        }
      }
      return tiles;                        
    }) 
  }

  const createTile = (value:number, row:number, column:number) => {
    return {
      key: new Date().getTime(),
      row,
      column,
      value,
      isVisible: true,
    }
  }

  const handleKeyDown = (event:any) => {
    const { keyCode } = event;
    switch (keyCode) {
      case keyLeft: {
        console.log('left');
        
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
    addTile();
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [tiles]);

  const cellsView = cells.map((row, rowIndex) => {
    return row.map((_, cellIndex) => {
      const key = boardSize * rowIndex + cellIndex;
      return <Cell key={key} row={rowIndex} column={cellIndex}/>
    });
  })

  const tilesView = tiles.map((tile, index) => {
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
