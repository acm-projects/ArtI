import '../styles/pages/MyBoards.css'
import React, { useContext } from 'react'
import { BoardsStateContext } from '../pages/MyBoards'
import { bufferToBase64 } from '../utils/BufferToBase64'
import { Row, Image, Col, Button } from 'react-bootstrap'

export default function BoardPopup({ boards, deleteBoard, handleCloseModal }) {
  const {
    user,
    selectedBoard,
    setSelectedBoard,
    setNewImageURL,
    setShowImageModal,
    setSelectedImage,
    setShowModal,
  } = useContext(BoardsStateContext)
  return (
    <>
      <div className='board-popup'>
        <div
          className='board-popup-background'
          onClick={() => setSelectedBoard(null)}
        />
        <div className='board-popup-content'>
          <Row>
            <h2>{boards[selectedBoard].boardName} </h2>
          </Row>
          <Row className='images-container'>
            {boards[selectedBoard].images.map((image, imageIndex) => (
              // <Col key={imageIndex}>
              <button
                key={imageIndex}
                className='image-btn'
                onClick={() => {
                  setNewImageURL(
                    `data:image/png;base64,${bufferToBase64(image.data.data)}`
                  )
                  setShowImageModal(true)
                  setSelectedImage(image.id)
                }}
              >
                <Image
                  src={`data:image/png;base64,${bufferToBase64(
                    image.data.data
                  )}`}
                  alt={`Thumbnail image of ${image.prompt}`}
                  className='image-thumbnail'
                  thumbnail
                  loading='lazy'
                />
              </button>
              // </Col>
            ))}
          </Row>

          {/* <Button variant='primary' onClick={handleShowAddImageModal}>
                Add Image
              </Button> */}
          <Row>
            <Col sm={6}></Col>
            <Col sm={6} className='d-flex justify-content-end'>
              <Button
                variant='secondary'
                onClick={() => {
                  deleteBoard(user, boards[selectedBoard].boardName)
                  setShowModal(false)
                }}
                className='mx-1'
              >
                Delete Board
              </Button>
              <Button
                variant='secondary'
                onClick={() => setSelectedBoard(null)}
                className='mx-1'
              >
                Close
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}
