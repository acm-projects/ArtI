import '../styles/pages/MyBoards.css'
import {
  Container,
  Row,
  Col,
  FormControl,
  Modal,
  Button,
  Image,
  Spinner,
  Accordion,
} from 'react-bootstrap'
import React, {
  useState,
  useContext,
  createContext,
  useRef,
  useEffect,
} from 'react'
import axios from 'axios'
import Board from '../components/Board'
import BoardExpand from '../components/BoardExpand'
import { UserAndBoardContext } from '../App'
import { bufferToBase64 } from '../utils/BufferToBase64.js'
import BoardPopup from '../components/BoardPopup'

export const BoardsStateContext = createContext()

const MyBoards = () => {
  const thisRef = useRef(null)
  const { user, boards, setBoards } = useContext(UserAndBoardContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [newBoardName, setNewBoardName] = useState('')
  const [showModal, setShowModal] = useState(false)
  // const [showAddImageModal, setShowAddImageModal] = useState(false) -- not needed???
  const [newImageURL, setNewImageURL] = useState('')
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  // const [parentWidth, setParentWidth] = useState(0)
  // const [expand, setExpand] = useState(false)

  const boardStateValues = {
    user,
    selectedBoard,
    setSelectedBoard,
    showImageModal,
    setShowImageModal,
    selectedImage,
    setSelectedImage,
    // expand,
    // setExpand,
    newImageURL,
    setNewImageURL,
  }

  useEffect(() => {
    console.log('width', thisRef.current ? thisRef.current.offsetWidth : 0)
  }, [])

  // Manually calling the the API to get all the boards of the user
  async function getBoards(user) {
    const username = user.username
    const getUrl = `/api/v1/boards/${username}`
    try {
      const response = await axios(getUrl)
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  // Calling the API to update the database for a new board of the user
  async function createNewBoard(user, newBoardName) {
    const username = user.username
    const boardName = newBoardName
    const images = []
    const thumbnail = null
    const customThumbnail = false

    // Prevents creating a board with same name on the front-end
    if (boards.some((board) => board.boardName === newBoardName)) {
      alert('A board with this name already exists.')
      return
    }

    try {
      const postUrl = '/api/v1/boards'
      const response = await axios.post(postUrl, {
        username: username,
        boardName: boardName,
        images: images,
        thumbnail: thumbnail,
        customThumbnail: customThumbnail,
      })

      console.log('Created a new board: ', response.data)

      // Updating how boards should be rendered on the page using useState
      if (boards === undefined) setBoards([response.data])
      else {
        // TODO :: this is prob inefficient since im calling the api again but at least it's safe
        const bArr = await getBoards(user)
        setBoards(bArr)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async function deleteBoard(user, deleteThisBoard) {
    try {
      const username = user.username
      const boardName = deleteThisBoard
      console.log(`trying to delete this board ${boardName}`)
      const postUrl = `/api/v1/boards/${username}`
      const response = await axios.post(postUrl, { boardName: boardName })

      console.log('Deleted a board: ', response.data)

      // Updating how boards should be rendered on the page using useState
      if (boards === undefined) setBoards([response.data])
      else {
        // TODO :: this is prob inefficient since im calling the api again but at least it's safe
        const bArr = await getBoards(user)
        setBoards(bArr)
      }

      setNewBoardName('')
      setSelectedBoard(null) // closes the BoardsPopup
    } catch (error) {
      console.log(error.message)
    }
  }

  // Calling the API to delete the imageToDelete from the one of the user's boards
  async function deleteImage(user, userBoard, boardImages, imageToDelete) {
    try {
      // console.log('hello')
      const username = user.username
      const boardName = userBoard
      let images = boardImages
      // console.log('boardname: ', boardName)
      // console.log('images in the board: ', images)
      const imagesToDelete = imageToDelete
      // console.log('selected image: ', imagesToDelete)
      console.log('deleting details: ', {
        boardName: boardName,
        imagesInBoard: images,
        selectedImage: imageToDelete,
      })
      const isCustomThumbnail = user.customThumbnail
      const postUrl = `/api/v1/boards/${username}/add-delete`

      // for (let i = 0; i < images.length; i++) {
      //   images[i] = images[i].id
      //   console.log(`this is the image id at ${i}: ${images[i]} `)
      // }

      const response = await axios.post(postUrl, {
        boardName: boardName,
        images: images,
        imageUpdates: [imagesToDelete],
        deleteImage: true,
        isCustomThumbnail: isCustomThumbnail,
      })

      console.log('Deleted an image: ', response.data)

      // This is re-rendering boards by mutating the boards on the front-end (idk which is better -- calling api or mutating on front-end)
      const newBoards = boards.map((board) => {
        if (board.boardName === response.data.boardName) return response.data
        else return board
      })
      setBoards(newBoards)
    } catch (error) {
      console.log(error.message)
    }
  }

  // async function handleGettingBoards() {
  //   const bArr = await getBoards(user)
  //   setBoards(bArr)
  // }

  // not used???
  // const handleAddBoard = () => {
  //   if (boards.some((board) => board.boardName === modalSearchTerm)) {
  //     alert('A board with this name already exists.')
  //     return
  //   }

  //   const newBoard = {
  //     name: modalSearchTerm,
  //     images: newImageURL ? [newImageURL] : [],
  //   }
  //   setBoards([...boards, newBoard])
  //   setModalSearchTerm('')
  //   setNewImageURL('')
  // }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  // made this inline
  // const handleModalSearch = (event) => {
  //   setNewBoardName(event.target.value)
  // }

  // made this inline
  // const handleBoardClick = (boardIndex) => {
  //   setSelectedBoard(boardIndex)
  // }

  // made this inline
  // const closeBoard = () => {
  //   setSelectedBoard(null)
  // }

  // not needed???
  // const handleShowAddImageModal = () => {
  //   setShowAddImageModal(true)
  // }
  // const handleCloseAddImageModal = () => {
  //   setShowAddImageModal(false)
  // }
  // const handleAddImageToBoard = () => {
  //   const newBoards = [...boards]
  //   newBoards[selectedBoard].images.push(newImageURL)
  //   setBoards(newBoards)
  //   setNewImageURL('')
  //   handleCloseAddImageModal()
  // }

  return (
    <BoardsStateContext.Provider value={boardStateValues}>
      <Container>
        <Row className='py-4'>
          <Col xs={12}>
            <h1>{user.username}'s Boards </h1>
          </Col>
        </Row>

        {/* Search Board */}
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

        {/* Create Board Button */}
        <Row>
          <div className='create-wrapper'>
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
            <p>Name your board</p>
            <FormControl
              type='text'
              placeholder='e.g. background inspo'
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                createNewBoard(user, newBoardName)
                handleCloseModal()
              }}
            >
              Add Board
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Row of boards */}
        <Row className='boards-container py-4' ref={thisRef}>
          {/* Renders a spinner to show loading if boards is empty */}
          {boards !== undefined ? (
            boards.length === 0 ? (
              <Col className='d-flex justify-content-center'>
                <Spinner animation='border' />
              </Col>
            ) : (
              boards.map((board, boardIndex) => {
                return (
                  <>
                    <Col key={boardIndex} xs={12} md={6}>
                      {/* <Accordion> */}
                      <Board
                        key={boardIndex}
                        board={board}
                        boardIndex={boardIndex}
                        parentWidth={
                          thisRef.current ? thisRef.current.offsetWidth : 0
                        }
                      />

                      {/* <Accordion.Collapse eventKey={boardIndex}>
                          <BoardExpand
                            board={board}
                            boardIndex={boardIndex}
                          ></BoardExpand>
                        </Accordion.Collapse>
                      </Accordion> */}
                    </Col>
                  </>
                )
              })
            )
          ) : (
            <Col className='text-center'>There are no available boards</Col>
          )}
        </Row>

        {/* Popup when Board is clicked */}
        {selectedBoard !== null && (
          <BoardPopup
            boards={boards}
            deleteBoard={deleteBoard}
            handleCloseModal={handleCloseModal}
          />
        )}

        {/* Modal that shows when clicking image in BoardPopup */}
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
              onClick={async () => {
                await deleteImage(
                  user,
                  boards[selectedBoard].boardName,
                  boards[selectedBoard].images,
                  selectedImage
                )
                setShowImageModal(false)
              }}
            >
              Delete Image
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </BoardsStateContext.Provider>
  )
}

// not used???
// async function getSingleBoard(user) {
//   const username = user.username
//   const boardName = user.boardName

//   try {
//     const getUrl = `/api/v1/boards/${username}/${boardName}`

//     const response = await axios.post(getUrl)
//     console.log(response)
//   } catch (error) {
//     console.log(error.message)
//   }
// }

// not yet needed - but soon...
async function changeThumbnailOrBoardName(user) {
  try {
    const username = user.username
    const boardName = user.boardName
    const thumbnailImage = ''
    const newBoardName = ''
    const patchUrl = `/api/v1/boards/${username}/${boardName}`

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
