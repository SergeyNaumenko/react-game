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

type BoardMatrixType = (number | null)[][];

type GameConfigsType = {
  isActiveMusic: boolean,
  musicVolume: number,
  isActiveSoundEffects: boolean,
  soundEffectsVolume: number,

  targetScore: number,
  animationSpeed: number,
  boardSize: number,

  userName: string,
}

export type {
  TileType,
  BoardType,
  BoardMatrixType,
  GameConfigsType,
}