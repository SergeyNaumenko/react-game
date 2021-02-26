import { isNull, isNumber } from "util";
import { TileType, BoardMatrixType } from '../types';

export default class BoardActions {
  private rotationCount: {[key: string]: number;} = {
    'left': 0,
    'top': 1,
    'right': 2,
    'down': 3,
  }

  private matrix: BoardMatrixType;
  private tiles: TileType[];
  private matrixSize: number;
  private movements: BoardMatrixType;

  constructor(matrix: BoardMatrixType, tiles: TileType[]) {
    this.matrix = matrix;
    this.tiles = tiles;
    this.matrixSize = matrix.length;
    this.movements = Array(this.matrixSize)
                      .fill(null)
                      .map(() => Array(this.matrixSize).fill(null));
  }

  private getRandomIndex = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private rotateMatrixLeft = (matrix: BoardMatrixType) => {
    const matrixSize = matrix.length;
    const result: BoardMatrixType = [];
    for (let row = 0; row < matrixSize; ++row) {
      result.push([]);
      for (let column = 0; column < matrixSize; ++column) {
        result[row][column] = matrix[column][matrixSize - row - 1];
      }
    }
    return result;
  }

  private shiftMatrixLeft = () => {
    for (let row = 0; row < this.matrixSize; row++) {
      for (let i = 0; i < this.matrixSize - 1; i++) {
        for(let j = i + 1; j < this.matrixSize; j++) {
          const tile1Key = this.matrix[row][i];
          const tile2Key = this.matrix[row][j];
          
          if (isNull(tile1Key) && !isNull(tile2Key)) {
            this.matrix[row][i] = tile2Key;
            this.matrix[row][j] = null;
            this.movements[row][i] = tile2Key;
  
            j = i + 1;
          }
          if (!isNull(tile1Key) && !isNull(tile2Key)){
            const tile1Index = this.tiles.findIndex((item) => item.key === tile1Key);
            const tile2Index = this.tiles.findIndex((item) => item.key === tile2Key);
            const tile1Value = this.tiles[tile1Index].value;
            const tile2Value = this.tiles[tile2Index].value;

            if (tile1Value === tile2Value) {
              this.tiles[tile1Index].value = this.tiles[tile1Index].value * 2;
              
              this.tiles[tile2Index].isVisible = false;
              this.movements[row][i] = this.tiles[tile2Index].key;
              
              this.matrix[row][j] = null;
            }
            break;
          }
        }
      }
    }
  }

  private makeMove = (direction: string) => {
    const rotations: number = this.rotationCount[direction];
  
    for (let i = 0; i < rotations; i++) {
      this.matrix = this.rotateMatrixLeft(this.matrix);
    }
    
    this.shiftMatrixLeft();

    for (let i = rotations; i < 4; i++) {
      this.matrix = this.rotateMatrixLeft(this.matrix);
      this.movements = this.rotateMatrixLeft(this.movements);
    }
    
    this.updateTilesPosition(this.movements);
    this.updateTilesPosition(this.matrix);
  }

  private updateTilesPosition = (matrix: BoardMatrixType) => {
    for (let row = 0; row < this.matrixSize; row++) {
      for (let column = 0; column < this.matrixSize; column++) {
        const key = matrix[row][column];
        if (key) {
          const tileIndex = this.tiles.findIndex((tile) => tile.key === key);
          if (tileIndex !== -1) {
            this.tiles[tileIndex].row = row;
            this.tiles[tileIndex].column = column;
          }
        }
      }
    }
  }

  private removeInvisible = () => {
    this.tiles = [...this.tiles.filter((tile) => tile.isVisible)];
  }

  private createTile = (value:number, row:number, column:number) => {
    return {
      key: new Date().getTime(),
      row,
      column,
      value,
      isVisible: true,
      isNew: true
    }
  }

  private addTile = () => {
    const nullIndexes = this.matrix.flat()
                          .map((value, index) => isNull(value) ? index : null)
                          .filter((value) => value != null);
  
    if (nullIndexes.length) {
      const randIndex = nullIndexes[this.getRandomIndex(nullIndexes.length)];
      if (isNumber(randIndex)) {
        const row = Math.trunc(randIndex / this.matrixSize);
        const column = randIndex % this.matrixSize;
        
        const newTile = this.createTile(2, row, column);
        this.tiles.push(newTile);
        
        this.matrix[row][column] = newTile.key;
      }
    }
  }

  public makeAction = (direction: string) => {
    this.removeInvisible();
    this.makeMove(direction);
    this.addTile();

    return {
      matrix: this.matrix,
      tiles: this.tiles,
    }
  }
}
