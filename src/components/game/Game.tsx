import React from 'react';
import Board from '../board';
import Footer from '../footer';
import { GameConfigsType } from '../../types';

import './style.scss';
import { useState } from 'react';
import ConfigContext from '../configContext';
import defaultConfig from '../../defaultConfigs';

const Game = () => {
  
  const [config, setConfig] = useState<GameConfigsType>(defaultConfig);
  
  return (
    <div className='game'>
      <header className='header'>
        <h1>here is the header</h1>
      </header>
      <main className='main'>
        <ConfigContext.Provider value={config}>
          <Board/>
        </ConfigContext.Provider>
      </main>
      <Footer/>
    </div>
  );
}

export default Game;
