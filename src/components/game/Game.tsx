import React, { useEffect, useState, useMemo} from 'react';
import {Howl} from 'howler';
import { GameConfigsType } from '../../types';
import Board from '../board';
import Footer from '../footer';

import ConfigContext from '../configContext';
import defaultConfig from '../../defaultConfigs';
import Header from '../header/header';
import ConfigView from '../configView';
import ScoreView from '../scoreView';
import { 
  LOCAL_STORAGE_TOP_RESULTS_NAME, 
  LOCAL_STORAGE_TOP_RESULTS_COUNT
} from '../../constants';

import './style.scss';

const Game = () => {
  const [config, setConfig] = useState<GameConfigsType>(defaultConfig);
  const [isActiveConfigView, setIsActiveConfig ] = useState<boolean>(false);
  const [isActiveScoreView, setIsActiveScoreView] = useState<boolean>(false);

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

  const handleScoreViewVisibility = () => {
    setIsActiveScoreView(!isActiveScoreView);
  }

  const handleFinishGame = (score: number) => {
    console.log('score ' + score);
    const { userName, boardSize, targetScore } = config;

    const newResultObj = {
      score,
      targetScore,
      userName,
      boardSize,
    }
    const topResultsStr = localStorage.getItem(LOCAL_STORAGE_TOP_RESULTS_NAME);
    if (!topResultsStr) {
      console.log('set empty')
      localStorage.setItem(LOCAL_STORAGE_TOP_RESULTS_NAME, JSON.stringify({results: [newResultObj]}));
    } else {
      const { results } = JSON.parse(topResultsStr);
      console.log(results)
      const newResults = [...results, newResultObj];

      newResults.sort((result1, result2) => {
        if (result1.score < result2.score) {
          return 1;
        }
        if (result1.score > result2.score) {
          return -1;
        }
        return 0;
      });
      if (newResults.length > LOCAL_STORAGE_TOP_RESULTS_COUNT) {
        newResults.splice(LOCAL_STORAGE_TOP_RESULTS_COUNT)
      }
      
      console.log(newResultObj)
      console.log(newResults)
      console.log(results)


      localStorage.setItem(LOCAL_STORAGE_TOP_RESULTS_NAME, JSON.stringify({results: newResults}));
    }
  }


  const ConfigViewElement = isActiveConfigView ? <ConfigView onConfigChanged={handleConfigChange} onModalShow={handleConfigViewVisibility}/> : null;
  const ScoreViewElement = isActiveScoreView ? <ScoreView onModalShow={handleScoreViewVisibility}/> : null;

  return (
    <div className='game'>
      <ConfigContext.Provider value={config}>
        <Header 
          onShowConfigView={handleConfigViewVisibility}
          onShowScoreView={handleScoreViewVisibility}
        />
        { ConfigViewElement }
        { ScoreViewElement } 

        <main className='main'>
            <Board onFinish={handleFinishGame}/>
        </main>
      </ConfigContext.Provider>
      <Footer/>
    </div>
  );
}

export default Game;
