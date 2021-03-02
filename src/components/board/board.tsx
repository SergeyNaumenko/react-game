import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { isNull } from 'util';
import {
  keyLeft,
  keyUp,
  keyRight,
  keyDown,
} from '../../constants';
import Cell from '../cell';
import Tile from '../tile';
import BoardActions  from '../../utils/BoardActions';
import ConfigContext from '../configContext';
import './style.scss';
import { BoardType } from '../../types';
import {Howl} from 'howler';
import ResultView from '../resultView';

const Board = () => {
  const { 
    boardSize, 
    targetScore, 
    soundEffectsVolume, 
    isActiveSoundEffects,
    userName } = useContext(ConfigContext);
  
  const cells = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
  
  const sounds = useMemo(() => ({
    swap: new Howl({
            src: ['swap_effect.wav'],
            volume: soundEffectsVolume,
          }),
    error: new Howl({
      src: ['error_effect.wav'],
      volume: soundEffectsVolume,
    }),
  }), [soundEffectsVolume]);


  const [board, setBoard] = useState<BoardType>({
    matrix: cells,
    tiles: [],
    gameWasFailed: false,
    gameWasWon: false,
    score: 0,
    isActiveGame: true,
  });


  useEffect(()=> {
    setBoard({
      matrix: Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)),
      tiles: [],
      gameWasFailed: false,
      gameWasWon: false,
      score: 0,
      isActiveGame: true,
    })
  }, [boardSize])

  const makeAction = useCallback(
    (direction: string) => {
    
      
      const {matrix, tiles, score} = board;
      const boardActions = new BoardActions(matrix, tiles, targetScore);
      const { 
        matrix: newMatrix, 
        tiles: newTiles, 
        gameWasFailed, 
        gameWasWon,
        tileWasMoved,
        score: additionScore,
      } = boardActions.makeAction(direction);
      
      if (isActiveSoundEffects) {
        if (tileWasMoved) {
          sounds.swap.play();
        } else {
          sounds.error.play();
        }
      }

      setBoard({
          matrix: [...newMatrix],
          tiles: newTiles,
          gameWasFailed,
          gameWasWon,
          score: score + additionScore,
          isActiveGame: !gameWasFailed && !gameWasWon,
        });
    }
    ,[board, targetScore, isActiveSoundEffects, sounds]);

  useEffect(() => {
    function handleKeyDown(event:any) {
      const { keyCode } = event;
      
      if (board.isActiveGame) {
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
    }

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [board, makeAction]);

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const baseWidth = vw > vh ? vh : vw;
  const boardWidth = baseWidth * 0.7;
  const boardHeight = boardWidth;
  const cellWidth = boardWidth / boardSize;
  const cellHeight = cellWidth;

  const cellsView = cells.map((row, rowIndex) => {
    return row.map((_, cellIndex) => {
      const key = boardSize * rowIndex + cellIndex;
      return <Cell key={key} row={rowIndex} column={cellIndex} width={cellWidth} height={cellHeight}/>
    });
  })

  const tilesView = board.tiles.map((tile) => {
    if (!isNull(tile)) {
      return <Tile key={tile.key} tile={tile} width={cellWidth} height={cellHeight}/>;
    }
    return null;
  });

  return (
    <Container className='my-3'>
      <Row className='fs-1 my-3'>
        <Col className='d-flex justify-content-center'>
          { board.score }
        </Col>
        <Col className='d-flex justify-content-center'>
          new  game
        </Col>
      
      </Row>
      <Row className=''>
        <Col className='d-flex justify-content-center'>
          <div className='position-relative'
            style={{
              width: `${boardWidth}px`,
              height: `${boardHeight}px`,
            }}>
            { cellsView }
            { tilesView }
            { board.gameWasWon || board.gameWasFailed ? 
              <ResultView
                gameWasFailed={board.gameWasFailed}
                score={board.score}
                userName={userName}  /> 
              : '' }
          </div>
        </Col>
      </Row>
    </Container>
  )
  
}

export default Board;
