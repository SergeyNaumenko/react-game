import { isNull, isNumber } from "util";
import { TileType, BoardMatrixType } from '../types';

export default class BoardActions {
  private rotationCount: {[key: string]: number;} = {
    'left': 0,
    'top': 1,
    'right': 2,
    'down': 3,
  }

  private targetScore: number;
  private matrix: BoardMatrixType;
  private tiles: TileType[];
  private matrixSize: number;
  private movements: BoardMatrixType;
  private gameWasWon: boolean;
  private gameWasFailed: boolean;
  private tileWasMoved: boolean;
  private score: number;

  constructor(matrix: BoardMatrixType, tiles: TileType[], targetScore: number) {
    this.targetScore = targetScore;
    this.matrix = matrix;
    this.tiles = tiles;
    this.matrixSize = matrix.length;
    this.movements = Array(this.matrixSize)
                      .fill(null)
                      .map(() => Array(this.matrixSize).fill(null));
    this.gameWasWon = false;
    this.gameWasFailed = false;
    this.tileWasMoved = false;
    this.score = 0;
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
            this.tileWasMoved = true;
            this.score += 1;
  
            j = i;
            continue;
          }
          if (!isNull(tile1Key) && !isNull(tile2Key)) {
            const tile1Index = this.tiles.findIndex((item) => item.key === tile1Key && item.isVisible);
            const tile2Index = this.tiles.findIndex((item) => item.key === tile2Key && item.isVisible);
            
            const tile1Value = this.tiles[tile1Index].value;
            const tile2Value = this.tiles[tile2Index].value;

            if (tile1Value === tile2Value) {
              const newValue = this.tiles[tile1Index].value * 2;
              this.tiles[tile1Index].value = newValue;
              
              this.tiles[tile2Index].isVisible = false;
              this.movements[row][i] = tile2Key;
              
              this.matrix[row][j] = null;
              this.tileWasMoved = true;

              this.score += newValue;
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

  private resetMovements = () => {
    this.movements = Array(this.matrixSize)
                      .fill(null)
                      .map(() => Array(this.matrixSize).fill(null));
  }

  private createTile = (value:number, row:number, column:number) => {
    return {
      key: new Date().getTime(),
      row,
      column,
      value,
      isVisible: true,
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
    this.tileWasMoved = false;
    if (this.tiles.length > 0) {
      this.removeInvisible();
      this.resetMovements();
      this.makeMove(direction);
    }
    
    if (this.tileWasMoved || this.tiles.length === 0) {
      this.addTile();
    }
    
    this.checkCompleteStatus();
    this.checkFailedStatus();
    
    return {
      matrix: this.matrix,
      tiles: this.tiles,
      gameWasWon: this.gameWasWon,
      gameWasFailed: this.gameWasFailed,
      tileWasMoved: this.tileWasMoved,
      score: this.score,
    }
  }

  private checkCompleteStatus = () => {
    this.gameWasWon = this.tiles.findIndex((tile) => tile.value === this.targetScore) !== -1;
  }

  private checkFailedStatus = () => {
    const hasNullCells = this.matrix.flat().findIndex((cell) => isNull(cell)) > -1;

    if (hasNullCells) {
      this.gameWasFailed = false;
      return;
    }

    for (let row = 0; row < this.matrixSize; row++) {
      for (let i = 0, j = i + 1; i < this.matrixSize - 1; i++, j++) {
        const tile1Key = this.matrix[row][i];
        const tile2Key = this.matrix[row][j];
        
        const tile1Index = this.tiles.findIndex((item) => item.key === tile1Key && item.isVisible);
        const tile2Index = this.tiles.findIndex((item) => item.key === tile2Key && item.isVisible);
        
        const tile1Value = this.tiles[tile1Index].value;
        const tile2Value = this.tiles[tile2Index].value;
        
        if (tile1Value === tile2Value) {
          this.gameWasFailed = false;
          return;
        }
      }
    }

    for (let column = 0; column < this.matrixSize; column++) {
      for (let i = 0, j = i + 1; i < this.matrixSize - 1; i++, j++) {
        const tile1Key = this.matrix[i][column];
        const tile2Key = this.matrix[j][column];

        const tile1Index = this.tiles.findIndex((item) => item.key === tile1Key && item.isVisible);
        const tile2Index = this.tiles.findIndex((item) => item.key === tile2Key && item.isVisible);
          
        const tile1Value = this.tiles[tile1Index].value;
        const tile2Value = this.tiles[tile2Index].value;

        if (tile1Value === tile2Value) {
          this.gameWasFailed = false;
          return;
        }
      }
    }

    this.gameWasFailed = true;
    return;
  } 
}
