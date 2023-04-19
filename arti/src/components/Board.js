import React, { useCallback, useContext } from 'react'
import {
  Card,
  Col,
  Image,
  useAccordionButton,
  Accordion,
} from 'react-bootstrap'
import styles from '../styles/components/board.module.css'
import { BoardsStateContext } from '../pages/MyBoards'
import { bufferToBase64 } from '../utils/BufferToBase64.js'
import BoardExpand from '../components/BoardExpand'

export default function Board({ board, boardIndex, callback }) {
  const { setSelectedBoard } = useContext(BoardsStateContext)
  const { boardName, images } = board
  const expander = useAccordionButton(
    boardIndex,
    () => callback && callback(boardIndex)
  )

  return (
    <>
      <Col xs={12} md={6}>
        <Accordion>
          <div className={`my-2 ${styles['board-container']}`}>
            <button
              className={styles['board-btn']}
              onClick={() => {
                setSelectedBoard(boardIndex)
                expander()
              }}
            >
              <Card>
                <Card.Body>
                  <Card.Title className='pb-3'>{boardName}</Card.Title>

                  <div className={`${styles['image-previews']}`}>
                    <Col xs={6} className={`${styles['thumbnail-container']}`}>
                      {board.thumbnail ? (
                        <Image
                          className={`${styles.thumbnail}`}
                          src={`data:image/png;base64,${bufferToBase64(
                            board.thumbnail.data.data
                          )}`}
                          rounded={true}
                          key={boardIndex}
                        />
                      ) : (
                        <>No Images Yet</>
                      )}
                    </Col>
                    <Col xs={6} className={`${styles['previews-container']}`}>
                      {images.map((image, i) => {
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
                        else return <p>+{images.length - (i + 1)} more</p>
                      })}
                    </Col>
                  </div>
                </Card.Body>
              </Card>
            </button>
          </div>

          <Accordion.Collapse eventKey={boardIndex}>
            <BoardExpand board={board} boardIndex={boardIndex}></BoardExpand>
          </Accordion.Collapse>
        </Accordion>
      </Col>
    </>
  )
}
