import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useContext, useState } from 'react';
import ConfigContext from '../configContext';

import './style.scss';

const ConfigView = ({onConfigChanged, onModalShow}:any) => {

  const prevConfig = useContext(ConfigContext);
  const [config, setConfig] = useState(prevConfig);

  const handleIsActiveMusicCheckbox = () => {
    const newConfig = {...config, isActiveMusic: !config.isActiveMusic};
    setConfig(newConfig);
  }

  const handleMusicVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    const newConfig = {...config, musicVolume: value};
    newConfig.isActiveMusic = value === 0 ? false : true;
    setConfig(newConfig);
  }

  const handleIsActiveSoundEffectCheckbox = () => {
    const newConfig = {...config, isActiveSoundEffects: !config.isActiveSoundEffects};
    setConfig(newConfig);
  }

  const handleSoundEffectVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    const newConfig = {...config, soundEffectsVolume: value};
    newConfig.isActiveSoundEffects = value === 0 ? false : true;
    setConfig(newConfig);
  }

  const handleAnimationSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    const newConfig = {...config, animationSpeed: value};
    setConfig(newConfig);
  }

  const handleTargetScoreChange = (value: number) => {
    const newConfig = {...config, targetScore: Number(value)};
    setConfig(newConfig);
  }

  const handleBoardSizeChange = (value: number) => {
    const newConfig = {...config, boardSize: Number(value)};
    setConfig(newConfig);
  }

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newConfig = {...config, userName: value};
    setConfig(newConfig);
  }

  const handleSaveConfig = () => {
    onConfigChanged(config);
    onModalShow();
  }

  return (
    <>
      <Modal show={true} onHide={() => onModalShow()}>
        <Modal.Header>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row className='d-flex'>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Music</Tooltip>}>
                <Form.Group as={Col} sm={1} className='d-flex justify-content-center' controlId='formBasicCheckbox'>
                  <Form.Check type='checkbox' checked={config.isActiveMusic} onChange={handleIsActiveMusicCheckbox}/>
                </Form.Group>  
              </OverlayTrigger>              
              <Form.Group as={Col} sm={11} className='d-flex align-content-center' controlId='formBasicRange'>  
                  <Form.Label className='me-3'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='svg-icon' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                      <path d='M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z'/>
                      <path fillRule='evenodd' d='M14 11V2h1v9h-1zM6 3v10H5V3h1z'/>
                      <path d='M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z'/>
                    </svg>
                  </Form.Label>
                  <Form.Control type='range' min='0' max='1' step='0.1' value={config.musicVolume} onChange={handleMusicVolumeChange}/>
              </Form.Group>
            </Form.Row>
            <Form.Row className='d-flex'>
              <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Sound Effects</Tooltip>}>
                <Form.Group as={Col} sm={1} className='d-flex justify-content-center' controlId='formBasicCheckbox'>
                  <Form.Check type='checkbox' checked={config.isActiveSoundEffects} onChange={handleIsActiveSoundEffectCheckbox}/>
                </Form.Group>  
              </OverlayTrigger>              
              <Form.Group as={Col} sm={11} className='d-flex align-content-center' controlId='formBasicRange'>  
                  <Form.Label className='me-3'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='svg-icon' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                    <path d='M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z'/>
                    <path d='M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z'/>
                    <path d='M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z'/>
                  </svg>
                  </Form.Label>
                  <Form.Control type='range' min='0' max='1' step='0.1' value={config.soundEffectsVolume} onChange={handleSoundEffectVolumeChange}/>
              </Form.Group>
            </Form.Row>
            <Form.Row className='d-flex'>          
              <Form.Group className='d-flex align-content-center' controlId='formBasicRange'>  
                  <Form.Label className='me-3'>
                    <span>Animation Speed</span>
                  </Form.Label>
                  <Form.Control type='range' min='0' max='1000' step='100' value={config.animationSpeed} onChange={handleAnimationSpeedChange}/>
              </Form.Group>
            </Form.Row>
            <Form.Row className='d-flex'>          
              <Form.Group className='d-flex align-items-end' controlId='formBasicRange'>  
                  <Form.Label className='me-3'>
                    <span>Target Score</span>
                  </Form.Label>
                  <div className='d-flex'>
                    { config.targetScores.map((score) => {
                      return (
                        <div className='me-2' key={score}>
                          <input 
                            type='radio' 
                            className='btn-check' 
                            name='targetScores' 
                            id={`targetScore${score}`} 
                            autoComplete='off'
                            value={score}
                            checked={config.targetScore === score} 
                            onChange={() => {}}/>
                          <label 
                            className={`btn btn-secondary custom-btn primary-btn ${config.targetScore === score ? 'primary-btn-active' : ''}`} 
                            htmlFor={`targetScore${score}`}
                            onClick={() => handleTargetScoreChange(score)}>
                              {score}
                          </label>
                        </div>
                      )
                    })}
                  </div>
              </Form.Group>
            </Form.Row>
            <Form.Row className='d-flex mt-2'>          
              <Form.Group className='d-flex align-content-center'>  
                  <Form.Label className='me-3'>
                    <span>Field size</span>
                  </Form.Label>
                  { config.boardSizes.map((boardSize) => {
                      return (
                        <div className='me-2' key={boardSize}>
                          <input 
                            type='radio' 
                            className='btn-check' 
                            name='boardSizes' 
                            id={`boardSize${boardSize}`} 
                            autoComplete='off'
                            value={boardSize}
                            checked={config.boardSize === boardSize} 
                            onChange={() => {console.log('onchange input')}}/>
                          <label 
                            className={`btn btn-secondary custom-btn primary-btn ${config.boardSize === boardSize ? 'primary-btn-active' : ''}`} 
                            htmlFor={`boardSize${boardSize}`}
                            onClick={() => handleBoardSizeChange(boardSize)}>
                              {`${boardSize} x ${boardSize}`}
                          </label>
                        </div>
                      )
                    })}
              </Form.Group>
            </Form.Row>
            <Form.Row className='d-flex mt-2'>          
              <Form.Group className='d-flex align-content-center'>
                <Form.Label className='me-2'>Username</Form.Label>
                <Form.Control className='fs-4' type='text' placeholder='Type Username here' value={config.userName} onChange={handleUserNameChange}/>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='secondary-btn custom-btn' variant='secondary' onClick={()=> onModalShow()}>
            Close
          </Button>
          <Button className='primary-btn custom-btn' variant='primary' onClick={handleSaveConfig}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ConfigView;