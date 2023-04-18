import React, { useCallback, useContext } from 'react'
import { Card, Col, Image, useAccordionButton } from 'react-bootstrap'
import styles from '../styles/components/board.module.css'
import { BoardsStateContext } from '../pages/MyBoards'
import { bufferToBase64 } from '../utils/BufferToBase64.js'

export default function Board({ board, boardIndex, parentWidth, callback }) {
  const {
    setSelectedBoard,
    // setShowImageModal,
    // setSelectedImage,
    // expand,
    // setExpand,
  } = useContext(BoardsStateContext)
  const { boardName, images } = board
  const expander = useAccordionButton(
    boardIndex,
    () => callback && callback(boardIndex)
  )
  // const [colSize, setColSize] = useState(6)

  // useEffect(() => {
  //   if (window.innerWidth >= 768) setColSize(4)
  // }, [])

  return (
    <div className={`my-2 ${styles['board-container']}`}>
      {/* <Col xs={12} md={colSize} className={`my-2 ${styles['board-container']}`}> */}
      <button
        className={styles['board-btn']}
        onClick={() => {
          // setExpand((current) => (current = !expand))
          setSelectedBoard(boardIndex)
          expander()
        }}
      >
        {/* <Card onClick={() => setSelectedBoard(boardIndex)}> */}
        <Card>
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

      {/* </Col> */}
    </div>
  )
}
