import { GameConfigsType } from './types';

const defaultConfig: GameConfigsType = {
  isActiveMusic: false,
  musicVolume: 0.5,
  isActiveSoundEffects: true,
  soundEffectsVolume: 0.5,

  targetScore: 2048,
  targetScores: [512, 1024, 2048],
  animationSpeed: 500,
  boardSize: 4,
  boardSizes: [3,4,5],

  userName: 'User1',
}

export default defaultConfig;