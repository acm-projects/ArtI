import '../styles/MyBoardsIndex.css'
import {
  Container,
  FormControl,
  Modal,
  Button,
  Card,
  Image,
} from 'react-bootstrap'
import React, { useState } from 'react'
import axios from 'axios'

const MyBoards = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [modalSearchTerm, setModalSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showAddImageModal, setShowAddImageModal] = useState(false)
  const [boards, setBoards] = useState([])
  const [newImageURL, setNewImageURL] = useState('')
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)

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
    <div>
      <h1>Welcome, USER </h1>

      <Container className='search-bar'>
        <FormControl
          type='text'
          placeholder='Search for Board...'
          value={searchTerm}
          onChange={handleSearch}
        />

        <Button
          variant='primary'
          onClick={handleShowModal}
          className='add-boards-button'
        >
          Create Board
        </Button>

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

            <p>Image URL</p>
            <FormControl
              type='text'
              placeholder='https://example.com/image.jpg'
              value={newImageURL}
              onChange={(e) => setNewImageURL(e.target.value)}
            />
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

        <div className='boards-container'>
          {boards.map((board, boardIndex) => (
            <Card
              key={boardIndex}
              style={{ width: '18rem', margin: '1rem' }}
              onClick={() => handleBoardClick(boardIndex)}
            >
              <Card.Body>
                <Card.Title>{board.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>

        {selectedBoard !== null && (
          <div className='board-popup'>
            <div className='board-popup-background' onClick={closeBoard} />
            <div className='board-popup-content'>
              <h2>{boards[selectedBoard].name} </h2>
              {boards[selectedBoard].images.map((imageURL, imageIndex) => (
                <div
                  key={imageIndex}
                  onClick={() => {
                    setNewImageURL(imageURL)
                    setShowImageModal(true)
                  }}
                >
                  <Image
                    src={imageURL}
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
    </div>
  )
}

async function getBoards(user) {
  // use the axios package by importing at the top
  // set it to a variable so u can access the stuff sent by backend
  const username = user.username
  console.log(username)
  const getUrl = `http://localhost:8080/api/v1/boards/${username}`
  try {
    const response = await axios(getUrl)

    console.log(response)
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
    const postUrl = 'http://localhost:8080/api/v1/boards'
    const response = await axios.post(postUrl, {
      username: username,
      boardName: boardName,
      images: images,
      thumbnail: thumbnail,
      customThumbnail: customThumbnail,
    })

    console.log('this is from creating new board' + response)
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

async function deleteImage(user, userBoard, boardImages, imageToDelete){
  try{
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
      isCustomThumbnail: isCustomThumbnail
    })

    console.log(response)

  }catch(error){
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
