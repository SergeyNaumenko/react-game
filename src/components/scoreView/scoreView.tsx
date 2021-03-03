import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { LOCAL_STORAGE_TOP_RESULTS_NAME } from '../../constants';
const ScoreView = ({onModalShow}:any)=> {
  
  const topResultsStr = localStorage.getItem(LOCAL_STORAGE_TOP_RESULTS_NAME);
  
  const results = !topResultsStr ? 'There are not results'
    : (
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>UserName</th>
          <th>Score</th>
          <th>Target Tile Number</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>{JSON.parse(topResultsStr).results.map((result:any, index:number) => {
        const {
          userName,
          score,
          targetScore,
          boardSize
        } = result;
        return (
        <tr key={index}>
          <td>{userName}</td>
          <td>{score}</td>
          <td>{targetScore}</td>
          <td>{boardSize}</td>
        </tr>
      )})}</tbody>
        </Table>);
   
  
  return (
    <>
      <Modal show={true} onHide={() => onModalShow()}>
        <Modal.Header>
          <Modal.Title>Top Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         { results }
        </Modal.Body>
        <Modal.Footer>
          <Button className='secondary-btn custom-btn' variant='secondary' onClick={() => onModalShow()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ScoreView;