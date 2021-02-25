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
    setBoard((board) => {
      console.log('make action')
      const withVisibleTiles: BoardType = removeInvisible(board);
      const shifted: BoardType = shiftMatrix(direction, withVisibleTiles);
      const withNewTile: BoardType = addTile(shifted);
      return {
        matrix: withNewTile.matrix,
        tiles: withNewTile.tiles,
      };
    })
  }

  const addTile = (board: BoardType) => {
    const { matrix, tiles } = board;
    const nullIndexes = matrix.flat()
                          .map((value, index) => isNull(value) ? index : null)
                          .filter((value) => value != null);

    if (nullIndexes.length) {
      const randIndex = nullIndexes[getRandomIndex(nullIndexes.length)];
      if (isNumber(randIndex)) {
        const newBoard = matrix.map((row) => row.map((column) => column));

        const row = Math.trunc(randIndex / boardSize);
        const column = randIndex % boardSize;
        
        const newTile = createTile(2, row, column);

        const newTiles = tiles.map((tile) => Object.assign({}, tile));
        newTiles.push(newTile);
        
        newBoard[row][column] = newTile.key;

        return {
          matrix: newBoard,
          tiles: newTiles,
        }
      }
    }
    return board;
  }

  const createTile = (value:number, row:number, column:number) => {
    return {
      key: new Date().getTime(),
      row,
      column,
      value,
      isVisible: true,
      isNew: true
    }
  }

  const shiftMatrix = (direction: string, board: BoardType) => {
    console.log('shift matrix')
    const { matrix, tiles } = board;

    const matrixSize = matrix.length;
    const newMatrix = [];
    const newTiles = tiles.map((tile) => Object.assign({}, tile));
    
    for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
      newMatrix.push([...matrix[rowIndex]]);
      
      for (let i = 0; i < matrixSize - 1; i++) {
        for(let j = i + 1; j < matrixSize; j++) {
          const tile1Key = newMatrix[rowIndex][i];
          const tile2Key = newMatrix[rowIndex][j];
          
          if (isNull(tile1Key) && !isNull(tile2Key)) {
            newMatrix[rowIndex][i] = tile2Key;
            newMatrix[rowIndex][j] = null;

            if (tile2Key) {
              const tileIndex = newTiles.findIndex((item) => item.key === tile2Key);
              newTiles[tileIndex].row = rowIndex;
              newTiles[tileIndex].column = i;
            }
            continue;
          }
          if (!isNull(tile1Key) && !isNull(tile2Key)){
            const tile1Index = newTiles.findIndex((item) => item.key === tile1Key);
            const tile2Index = newTiles.findIndex((item) => item.key === tile2Key);
            
            console.log(newTiles[tile1Index]);
            console.log(newTiles[tile2Index]);

            if (newTiles[tile1Index].value === newTiles[tile2Index].value) {
              console.log(newTiles[tile1Index].value);
              newTiles[tile1Index].value = newTiles[tile1Index].value * 2;
              console.log(newTiles[tile1Index].value);


              newTiles[tile2Index].isVisible = false;
              newTiles[tile2Index].row = rowIndex;
              newTiles[tile2Index].column = i;
              
              newMatrix[rowIndex][j] = null;
              continue;
            }
          }
        }
      }
    }

    return {
      matrix: newMatrix,
      tiles: newTiles,
    };
  }

  const removeInvisible = ({matrix, tiles}:BoardType) => {
    const newTiles = tiles.map((tile) => Object.assign({}, tile));
    return {
      matrix,
      tiles: [...newTiles.filter((tile) => tile.isVisible)],
    };
  }
  

  const handleKeyDown = (event:any) => {
    const { keyCode } = event;
    switch (keyCode) {
      case keyLeft: {
        console.log('left');
        makeAction('left');
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
