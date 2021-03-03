import React from 'react';
import { GameConfigsType }from '../types';
import defaultConfig from '../defaultConfigs';

const ConfigContext = React.createContext<GameConfigsType>(defaultConfig);

export default ConfigContext;