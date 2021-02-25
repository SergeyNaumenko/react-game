type TileType = {
  key: number,
  row: number,
  column: number,
  value: number,
  isVisible: boolean,
  isNew: boolean,
}

type BoardType = {
  matrix: (number | null)[][],
  tiles: TileType[],
}

export type {
  TileType,
  BoardType,
}