import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row, Image } from 'react-bootstrap'
import styles from '../styles/components/board.module.css'
import { BoardsStateContext } from '../pages/MyBoards'
import { bufferToBase64 } from '../utils/BufferToBase64.js'

export default function Board({ board, boardIndex, parentWidth }) {
  const { setSelectedBoard, setShowImageModal, setSelectedImage } =
    useContext(BoardsStateContext)
  const { boardName, images } = board
  const [colSize, setColSize] = useState(6)
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    if (window.innerWidth >= 768) setColSize(4)
  }, [])

  return (
    <>
      <Col
        key={boardIndex}
        xs={colSize}
        md={colSize}
        className={`my-2 ${styles['board-container']}`}
      >
        <button className={styles['board-btn']}>
          {/* <Card onClick={() => setSelectedBoard(boardIndex)}> */}
          <Card
            onClick={() => {
              setExpand((current) => (current = !expand))
            }}
          >
            <Card.Body>
              <Card.Title className='pb-3'>{boardName}</Card.Title>

              <div className={`${styles['image-previews']}`}>
                <Col xs={6} className={`${styles['thumbnail-container']}`}>
                  <Image
                    className={`${styles.thumbnail}`}
                    src={`data:image/png;base64,${bufferToBase64(
                      board.thumbnail.data.data
                    )}`}
                    rounded={true}
                    key={boardIndex}
                  />
                </Col>
                <Col xs={6} className={`${styles['previews-container']}`}>
                  {board.images.map((image, i) => {
                    if (image.id === board.thumbnail.id) return <></>
                    else if (i <= 3)
                      // only shows 4 placeholders
                      return (
                        <Image
                          key={i}
                          className={`${styles.preview}`}
                          src={`data:image/png;base64,${bufferToBase64(
                            image.data.data
                          )}`}
                          rounded={true}
                        />
                      )
                    else return <p>+{board.images.length - (i + 1)} more</p>
                  })}
                </Col>
              </div>
            </Card.Body>
          </Card>
        </button>

        <div
          className={`${styles['board-expand']} ${
            expand ? styles['board-expand-show'] : styles['board-expand-hide']
          }`}
          style={{
            width: parentWidth - 16,
            left:
              (boardIndex + 1) % 2 === 0
                ? -(parentWidth / 3)
                : (boardIndex + 1) % 3 === 0
                ? -((parentWidth / 3) * 2)
                : 0,
          }}
        >
          {board.images.map((image, i) => {
            return (
              // <button
              //   className={`${styles['image-btn']}`}
              //   onClick={() => {
              //     setShowImageModal(true)
              //     setSelectedImage(image.id)
              //   }}
              // >
              <Image
                key={i}
                src={`data:image/png;base64,${bufferToBase64(image.data.data)}`}
                alt={`Image of ${image.prompt}`}
                rounded={true}
              />
              // </button>
            )
          })}
        </div>
      </Col>
    </>
  )
}
