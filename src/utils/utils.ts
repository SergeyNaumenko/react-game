import { isNull, isNumber } from "util";
import Tile from "../components/tile";
import { BoardType, TileType } from '../types';

const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const shiftRow = (toLeft: boolean, matrix: (number|null)[][], tiles: TileType[]) => {
  const matrixSize = matrix.length;
  const newMatrix = [];
  const newTiles = tiles.map((tile) => Object.assign({}, tile));
  
  for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
    
    if(!toLeft) {
      newMatrix.push([...matrix[rowIndex]].reverse());
    } else {
      newMatrix.push([...matrix[rowIndex]]);
    }
    
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
            newTiles[tileIndex].column = !toLeft ? matrixSize - i - 1 : i;
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
            newTiles[tile2Index].column = !toLeft ? matrixSize - i - 1 : i;
            
            newMatrix[rowIndex][j] = null;
            continue;
          }
        }
      }
    }

    if (!toLeft) {
      newMatrix[rowIndex].reverse();
    }
  }

  return {
    matrix: newMatrix,
    tiles: newTiles,
  }
}

const shiftMatrix = (direction: string, board: BoardType) => {
  console.log('shift matrix')
  const { matrix, tiles } = board;
  switch (direction) {
    case 'left': {
      const newBoard = shiftRow(true, matrix, tiles);
      return {
        matrix: newBoard.matrix,
        tiles: newBoard.tiles,
      };
    }
    case 'right': {
      const newBoard = shiftRow(false, matrix, tiles);
      return {
        matrix: newBoard.matrix,
        tiles: newBoard.tiles,
      };
    }
    default: {
      return {
        matrix,
        tiles,
      };
    }
  }
  

  
}

const removeInvisible = ({matrix, tiles}:BoardType) => {
  const newTiles = tiles.map((tile) => Object.assign({}, tile));
  return {
    matrix,
    tiles: [...newTiles.filter((tile) => tile.isVisible)],
  };
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

const addTile = (board: BoardType) => {
  const { matrix, tiles } = board;
  const boardSize = matrix.length;
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

export {
  getRandomIndex,
  removeInvisible,
  shiftMatrix,
  addTile,
}