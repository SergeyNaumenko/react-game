type TileType = {
  key: number,
  row: number,
  column: number,
  value: number,
  isVisible: boolean,
}

type BoardType = {
  matrix: (number | null)[][],
  tiles: TileType[],
}

type BoardMatrixType = (number | null)[][];

type GameConfigsType = {
  isActiveMusic: boolean,
  musicVolume: number,
  isActiveSoundEffects: boolean,
  soundEffectsVolume: number,

  targetScore: number,
  targetScores: number[],
  animationSpeed: number,
  boardSize: number,
  boardSizes: number[],

  userName: string,
}

type TileProps = {
  tile: TileType
}

type TransitionTypes = {
  [key:string] : any,
}

export type {
  TileType,
  BoardType,
  BoardMatrixType,
  GameConfigsType,
  TileProps,
  TransitionTypes,
}