import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { isNull } from 'util';
import {
  keyLeft,
  keyUp,
  keyRight,
  keyDown,
  keyCtrl,
  keyQ,
} from '../../constants';
import Cell from '../cell';
import Tile from '../tile';
import BoardActions  from '../../utils/BoardActions';
import ConfigContext from '../configContext';
import './style.scss';
import { BoardType } from '../../types';
import {Howl} from 'howler';

const Board = () => {
  const { 
    boardSize, 
    targetScore, 
    soundEffectsVolume, 
    isActiveSoundEffects } = useContext(ConfigContext);
  
  const cells = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
  
  const sound = useMemo(() => new Howl({
    src: ['swap_effect.wav'],
    loop: true,
    volume: soundEffectsVolume,
  }), [soundEffectsVolume]);

  const [board, setBoard] = useState<BoardType>({
    matrix: cells,
    tiles: [],
    gameWasFailed: false,
    gameWasWon: false,
  });


  useEffect(()=> {
    setBoard({
      matrix: Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)),
      tiles: [],
      gameWasFailed: false,
      gameWasWon: false,
    })
  }, [boardSize])

  const makeAction = useCallback(
    (direction: string) => {
    
      if (isActiveSoundEffects) {
        sound.play();
      }

      const {matrix, tiles} = board;
      const boardActions = new BoardActions(matrix, tiles, targetScore);
      const { 
        matrix: newMatrix, 
        tiles: newTiles, 
        gameWasFailed, 
        gameWasWon,
        tileWasMoved } = boardActions.makeAction(direction);

      setBoard({
          matrix: [...newMatrix],
          tiles: newTiles,
          gameWasFailed,
          gameWasWon,
        });
    }
    ,[board, targetScore, isActiveSoundEffects, sound]);

  useEffect(() => {
    function handleKeyDown(event:any) {
      const { keyCode } = event;
      
      switch (keyCode) {
        case keyLeft: {
          makeAction('left');
          break;
        }
        case keyUp: {
          makeAction('top');
          break;
        }
        case keyRight: {
          makeAction('right');
          break;
        }
        case keyDown: {
          makeAction('down');
          break;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [board, makeAction]);

  const cellsView = cells.map((row, rowIndex) => {
    return row.map((_, cellIndex) => {
      const key = boardSize * rowIndex + cellIndex;
      return <Cell key={key} row={rowIndex} column={cellIndex}/>
    });
  })

  const tilesView = board.tiles.map((tile) => {
    if (!isNull(tile)) {
      return <Tile key={tile.key} tile={tile} />;
    }
    return null;
  });

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <div className='board'>
        { cellsView }
        { tilesView }
      </div>
    </div>
  )
  
}

export default Board;
