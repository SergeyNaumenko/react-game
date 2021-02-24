import { isNull } from "util";

const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const shiftArray = (arr: number[], direction: string) => {
  const matrixSize = Math.sqrt(arr.length);
  const matrix = createMatrix(arr, matrixSize);
  for(let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
    for(let i = 0; i < matrixSize - 1; i++) {
      for(let j = i + 1; j < matrixSize; j++) {
        let elem1: number | null = matrix[rowIndex][i];
        let elem2: number | null = matrix[rowIndex][j];
        if (isNull(elem1) && !isNull(elem2)) {
          matrix[rowIndex][i] = elem2;
          matrix[rowIndex][j] = null;
        }
        if (elem1 === elem2 && !isNull(elem1)) {
          matrix[rowIndex][i] = elem1 * 2;
          matrix[rowIndex][j] = null;
        }
      }

    }
  }
  return matrix.flat();
}

const createMatrix = (array: (number | null)[], size: number) => {
  const matrix = [];
  for (let i = 0; i < array.length; i += size) {
    const row = [];
    for (let j = i; j < i + size; j++) {
      row.push(array[j]);
    }
    matrix.push([...row]);
  }
  return matrix;
}

export {
  getRandomIndex,
  shiftArray,
}