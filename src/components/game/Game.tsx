import React, { useEffect, useState, useMemo} from 'react';
import {Howl} from 'howler';
import { GameConfigsType } from '../../types';
import Board from '../board';
import Footer from '../footer';

import ConfigContext from '../configContext';
import defaultConfig from '../../defaultConfigs';
import Header from '../header/header';
import ConfigView from '../configView';

import './style.scss';

const Game = () => {
  const [config, setConfig] = useState<GameConfigsType>(defaultConfig);
  const [isActiveConfigView, setIsActiveConfig ] = useState<boolean>(true);
  const { musicVolume, isActiveMusic } = config;
  const sound = useMemo(() => new Howl({
    src: ['melody.mp3'],
    loop: true,
    volume: musicVolume,
  }), [musicVolume]);
  
  useEffect(() => {
    if (isActiveMusic) {
      sound.play();
    }

    return () => { sound.pause(); }
  }, [isActiveMusic, sound]);

  const handleConfigChange = (newConfig: GameConfigsType) => {
    setConfig(newConfig);
  }

  const handleConfigViewVisibility = () => {
    setIsActiveConfig(!isActiveConfigView);
  }

  return (
    <div className='game'>
      <ConfigContext.Provider value={config}>
        <Header onShowConfigView={handleConfigViewVisibility}/>
        { isActiveConfigView ? <ConfigView onConfigChanged={handleConfigChange}/> : null}
        <main className='main'>
            <Board/>
        </main>
      </ConfigContext.Provider>
      <Footer/>
    </div>
  );
}

export default Game;
