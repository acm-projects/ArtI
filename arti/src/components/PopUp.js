import '../index.css'
import styles from '../styles/Popup.module.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { DropdownButton, Dropdown, Row, Col, Container } from 'react-bootstrap'

const saveImage = () => {
  //log for on click
  console.log('Image Saved!')

  //log image link for API (todo)
  console.log('https://pbs.twimg.com/media/EbvB35oXgAAiQsH.jpg')
}

export const Form = () => {
  return (
    <div className='form-container'>
      <form className='popup-form'>
        <Button className='save-button' type='submit' onClick={saveImage(true)}>
          Save
        </Button>
      </form>
    </div>
  )
}

//contents of popup
export default function PopUp({ show, handleClose, boards, imageUrl }) {
  //boards to save to function - need to figure out a way to pull data from boards to figure amt of
  const saveBoard = async () => {}

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Save your generated art!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Choose a board...</h4> */}
        <Row className='mb-4'>
          <Col>
            <Container>{<img src={imageUrl} alt='Prompt' />}</Container>
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col>
            <div className={styles['save-btn-wrapper']}>
              <Button variant='secondary' disabled>
                Save Image
              </Button>
              {/* //do dropdown from bootstrap using code from discord chat */}
              <DropdownButton id='board-select' title='Choose Board'>
                {boards.map((board, i) => {
                  return (
                    <Dropdown.Item key={i} onClick={'pullBoard'}>
                      {' '}
                      {board.boardName}{' '}
                    </Dropdown.Item>
                  )
                })}
              </DropdownButton>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <p>Closing without saving will lose the image...</p>
        <Button onClick={handleClose}>close</Button>
      </Modal.Footer>
    </Modal>
  )
}

/* return (props.trigger) ? (
  <div className='popups'>
      <div className='popup-inner'>
          <button className='close-btn' onClick={() => props.setTrigger(false)}>
              close
          </button>
          {props.children}

      </div>
    
  </div>
) : ""; */
