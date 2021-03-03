import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

type ResultViewProps = {
  gameWasFailed: boolean,
  score: number,
  userName: string,
}

const ResultView = (props: ResultViewProps)=> {

  const {
    gameWasFailed,
    score,
    userName } = props;

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  
  let msg = `${userName} you have won the game. Congratulations!`;
  if (gameWasFailed) {
    msg = `Wasted. Let's try again!`;
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form className='d-flex'>
            <span>{msg}</span>
            <span>Your score is {score}</span>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='secondary-btn custom-btn' variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ResultView;