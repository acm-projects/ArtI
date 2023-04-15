import '../index.css'
import styles from '../styles/Popup.module.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { DropdownButton, Dropdown, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'
import { useContext, useState } from 'react'
import { UserAndBoardContext } from '../App'

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
export default function PopUp({
  user,
  show,
  handleClose,
  image,
  showSaving,
  setShowSaving,
}) {
  const { boards, setBoards } = useContext(UserAndBoardContext)
  const [saveStatus, setSaveStatus] = useState('Saving...')
  //boards to save to function - need to figure out a way to pull data from boards to figure amt of
  const saveBoard = async (e) => {
    try {
      const imageUpdates = [JSON.stringify(image)]
      const boardName = e.target.name
      const body = {
        boardName: boardName,
        imageUpdates: imageUpdates,
        shouldDelete: false,
        isCustomThumbnail: false,
      }

      console.log(body)

      setShowSaving(true)
      const save = await axios.post(
        `/api/v1/boards/${user.username}/add-delete`,
        body
      )
      if (save.status === 200) {
        console.log(save.data)
        setSaveStatus(`Saved to "${boardName}"`)
        // Updates the new image into the boards array
        const newBoards = boards.map((board) => {
          if (board.boardName === save.data.boardName) return save.data
          else return board
        })
        setBoards(newBoards)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

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
            <Container>
              {<img src={`data:image/png;base64,${image.data}`} alt='Prompt' />}
            </Container>
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col>
            <div className={styles['save-btn-wrapper']}>
              <p
                className={`${showSaving ? 'd-inline text-success' : 'd-none'}`}
              >
                {saveStatus}
              </p>
              {/* //do dropdown from bootstrap using code from discord chat */}
              <DropdownButton id='board-select' title='Choose Board'>
                {boards !== undefined ? (
                  boards.map((board, i) => {
                    return (
                      <Dropdown.Item
                        key={i}
                        name={board.boardName}
                        onClick={saveBoard}
                      >
                        {' '}
                        {board.boardName}{' '}
                      </Dropdown.Item>
                    )
                  })
                ) : (
                  <Dropdown.Item>There are no available boards</Dropdown.Item>
                )}
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
