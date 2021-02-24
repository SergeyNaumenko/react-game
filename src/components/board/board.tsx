import React, { useEffect, useState } from 'react';
import { isNumber } from 'util';
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

import './style.scss';

const Board = () => {
  const boardSize = 4;
  const board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null))
  const cells = board;
  const testTiles = Array(boardSize ** 2).fill(null);
  const [tiles, setTiles] = useState(testTiles);

  const addTile = () => {
    setTiles((tiles) => {
      const nullIndexes = tiles.map((value, index) => !value ? index : null)
                              .filter((value) => value != null);

      if (nullIndexes.length) {
        const randIndex = nullIndexes[getRandomIndex(nullIndexes.length)];
        if (isNumber(randIndex)) {
          if (randIndex === 0) return [2, ...tiles.slice(1)]
          if (randIndex === tiles.length - 1) return [...tiles.slice(0, randIndex), 2];
          return [
            ...tiles.slice(0, randIndex),
            2, 
            ...tiles.slice(randIndex + 1)
          ]
        }
      }
      return tiles;                        
    }) 
  }

  const getRandomIndex = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
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
  }
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const cellsView = cells.map((row, rowIndex) => {
    return row.map((_, cellIndex) => {
      const key = boardSize * rowIndex + cellIndex;
      return <Cell key={key} row={rowIndex} column={cellIndex}/>
    });
  })

  const tilesView = tiles.map((value, index) => {
    if (value) {
      const row = Math.trunc(index / boardSize);
      const column = index % boardSize;
      const key = boardSize * row + column; 
      return <Tile key={key} number={value} row={row} column={column}/>
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
