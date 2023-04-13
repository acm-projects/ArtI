import '../styles/MyBoardsIndex.css'
import styles from '../styles/board.module.css'
import {
  Container,
  Row,
  Col,
  FormControl,
  Modal,
  Button,
  Card,
  Image,
  Spinner,
} from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Board from '../components/Board'

const MyBoards = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [modalSearchTerm, setModalSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showAddImageModal, setShowAddImageModal] = useState(false)
  const [boards, setBoards] = useState([])
  const [newImageURL, setNewImageURL] = useState('')
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)

  // When component mounts, get the boards from the API --> will fix and be moved to App.js and saved to sessionStorage
  useEffect(() => {
    handleGettingBoards()
  }, [])

  //
  async function handleGettingBoards() {
    const bArr = await getBoards(user)
    setBoards(bArr)
  }

  const handleAddBoard = () => {
    if (boards.some((board) => board.name === modalSearchTerm)) {
      alert('A board with this name already exists.')
      return
    }

    const newBoard = {
      name: modalSearchTerm,
      images: newImageURL ? [newImageURL] : [],
    }
    setBoards([...boards, newBoard])
    setModalSearchTerm('')
    setNewImageURL('')
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleModalSearch = (event) => {
    setModalSearchTerm(event.target.value)
  }

  const handleBoardClick = (boardIndex) => {
    setSelectedBoard(boardIndex)
  }

  const closeBoard = () => {
    setSelectedBoard(null)
  }

  const handleShowAddImageModal = () => {
    setShowAddImageModal(true)
  }

  const handleCloseAddImageModal = () => {
    setShowAddImageModal(false)
  }

  const handleAddImageToBoard = () => {
    const newBoards = [...boards]
    newBoards[selectedBoard].images.push(newImageURL)
    setBoards(newBoards)
    setNewImageURL('')
    handleCloseAddImageModal()
  }

  return (
    <>
      <Container>
        <Row className='py-4'>
          <Col xs={12}>
            <h1>{user.username}'s Boards </h1>
          </Col>
        </Row>

        <Row className='py-4'>
          <Col xs={12}>
            <FormControl
              type='text'
              placeholder='Search for Board...'
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>

        <Row>
          <div className={styles['create-wrapper']}>
            <Button
              variant='primary'
              onClick={handleShowModal}
              className='add-boards-button'
            >
              Create Board
            </Button>
          </div>
        </Row>

        {/* Modal for creating new boards */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Board</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Name Board</p>
            <FormControl
              type='text'
              placeholder='e.g. background inspo'
              value={modalSearchTerm}
              onChange={handleModalSearch}
            />

            {/* <p>Image URL</p>
              <FormControl
                type='text'
                placeholder='https://example.com/image.jpg'
                value={newImageURL}
                onChange={(e) => setNewImageURL(e.target.value)}
              /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant='primary'
              onClick={() =>
                createNewBoard(user, modalSearchTerm, handleAddBoard)
              }
            >
              Add Board
            </Button>
          </Modal.Footer>
        </Modal>

        <Row className='boards-container py-4'>
          {/* Renders a spinner to show loading if boards is empty */}
          {boards.length === 0 ? (
            <Spinner animation='border' />
          ) : (
            boards.map((board, boardIndex) => {
              console.log(board)
              return (
                // <Board boardDetails={board} key={boardIndex}></Board>
                <Col xs={6} md={6} key={boardIndex}>
                  <button className={styles['board-btn']}>
                    <Card onClick={() => handleBoardClick(boardIndex)}>
                      <Card.Body>
                        <Card.Title>{board.boardName}</Card.Title>
                      </Card.Body>
                    </Card>
                  </button>
                </Col>
              )
            })
          )}
        </Row>

        {selectedBoard !== null && (
          <div className='board-popup'>
            <div className='board-popup-background' onClick={closeBoard} />
            <div className='board-popup-content'>
              <h2>{boards[selectedBoard].boardName} </h2>
              {boards[selectedBoard].images.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  onClick={() => {
                    setNewImageURL(
                      `data:image/png;base64,${bufferToBase64(image.data.data)}`
                    )
                    setShowImageModal(true)
                  }}
                >
                  <Image
                    src={`data:image/png;base64,${bufferToBase64(
                      image.data.data
                    )}`}
                    alt='Image'
                    className='image-thumbnail'
                    thumbnail
                  />
                </div>
              ))}

              <Button variant='primary' onClick={handleShowAddImageModal}>
                Add Image
              </Button>
              <Button
                variant='secondary'
                onClick={() => deleteBoard(user, boards[selectedBoard].name)}
              >
                Delete Board
              </Button>
              <Button variant='secondary' onClick={closeBoard}>
                Close
              </Button>
            </div>
            <Modal show={showAddImageModal} onHide={handleCloseAddImageModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Add Image to {boards[selectedBoard]?.name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Image URL</p>
                <FormControl
                  type='text'
                  placeholder='https://example.com/image.jpg'
                  value={newImageURL}
                  onChange={(e) => setNewImageURL(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleCloseAddImageModal}>
                  Cancel
                </Button>
                <Button variant='primary' onClick={handleAddImageToBoard}>
                  Add Image
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
        <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image src={newImageURL} alt='Image' fluid />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => setShowImageModal(false)}
            >
              Close
            </Button>
            <Button
              variant='secondary'
              onClick={() =>
                deleteImage(
                  user,
                  boards[selectedBoard].name,
                  boards[selectedBoard].images
                )
              }
            >
              Delete Image
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

function bufferToBase64(buffer) {
  let binary = ''
  let bytes = new Uint8Array(buffer) // Uint8Array is an array of 8 integers (cuz a byte is 4 binary digits)
  const len = bytes.byteLength // the length in bytes of the array
  for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]) // concatenate every byte into a string
  return window.btoa(binary)
}

async function getBoards(user) {
  // use the axios package by importing at the top
  // set it to a variable so u can access the stuff sent by backend
  const username = user.username
  const getUrl = `http://localhost:8080/api/v1/boards/${username}`
  try {
    const response = await axios(getUrl)

    return response.data
  } catch (error) {
    console.log(error.message)
  }
  // do stuff with it
}

async function saveToBoards(user) {
  try {
    const username = user.username
    const boardName = user.boardName
    const images = user.images
    const imageToAdd = ''
    const isCustomThumbnail = user.customThumbnail
    const patchUrl = `http://localhost:8080/api/v1/boards/${username}`

    const response = await axios.patch(patchUrl, {
      boardName: boardName,
      images: images,
      imageUpdates: imageToAdd,
      deleteBoard: false,
      isCustomThumbnail: isCustomThumbnail,
    })

    console.log(response)
  } catch (error) {
    console.log(error.message)
  }
}

async function createNewBoard(user, newBoardName, handleAddBoard) {
  handleAddBoard()

  const username = user.username
  const boardName = newBoardName
  const images = []
  const thumbnail = ''
  const customThumbnail = false

  try {
    const postUrl = '/api/v1/boards'
    const response = await axios.post(postUrl, {
      username: username,
      boardName: boardName,
      images: images,
      thumbnail: thumbnail,
      customThumbnail: customThumbnail,
    })

    console.log('this is from creating new board', response)
  } catch (error) {
    console.log(error.message)
  }
}

async function getSingleBoard(user) {
  const username = user.username
  const boardName = user.boardName

  try {
    const getUrl = `http://localhost:8080/api/v1/boards/${username}/${boardName}`

    const response = await axios.post(getUrl)
    console.log(response)
  } catch (error) {
    console.log(error.message)
  }
}

async function deleteBoard(user, deleteThisBoard) {
  try {
    const username = user.username
    console.log(username)
    const boardName = deleteThisBoard
    console.log(`trying to delete this board ${boardName}`)
    const postUrl = `http://localhost:8080/api/v1/boards/${username}`

    const response = await axios.post(postUrl, { boardName: boardName })
    console.log(response)
  } catch (error) {
    console.log(error.message)
  }
}

async function deleteImage(user, userBoard, boardImages, imageToDelete) {
  try {
    const username = user.username
    const boardName = userBoard
    const images = boardImages
    const imagesToDelete = [imageToDelete]
    const isCustomThumbnail = user.customThumbnail
    const patchUrl = `http://localhost:8080/api/v1/boards/${username}`

    const response = await axios.patch(patchUrl, {
      boardName: boardName,
      images: images,
      imageUpdates: imagesToDelete,
      deleteImage: true,
      isCustomThumbnail: isCustomThumbnail,
    })

    console.log(response)
  } catch (error) {
    console.log(error.message)
  }
}

async function changeThumbnailOrBoardName(user) {
  try {
    const username = user.username
    const boardName = user.boardName
    const thumbnailImage = ''
    const newBoardName = ''
    const patchUrl = `http://localhost:8080/api/v1/boards/${username}/${boardName}`

    const response = await axios.patch(patchUrl, {
      newThumbnailUrl: thumbnailImage,
      newBoardName: newBoardName,
    })
    console.log(response)
  } catch (error) {
    console.log(error.message)
  }
}

export default MyBoards
