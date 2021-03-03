import { GameConfigsType } from './types';

const defaultConfig: GameConfigsType = {
  isActiveMusic: false,
  musicVolume: 0.5,
  isActiveSoundEffects: false,
  soundEffectsVolume: 0.5,

  targetScore: 8,
  targetScores: [8, 1024, 2048],
  animationSpeed: 500,
  boardSize: 3,
  boardSizes: [3,4,5],

  userName: 'User1',
}

export default defaultConfig;