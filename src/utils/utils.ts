import { isNull } from "util";

const getRandomIndex = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
}



const createMatrix = (array: (React.FC | null)[], size: number) => {
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
}