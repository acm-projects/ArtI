import React, { useContext } from 'react'
import styles from '../styles/components/board.module.css'
import { BoardsStateContext } from '../pages/MyBoards'
import { bufferToBase64 } from '../utils/BufferToBase64.js'
import { Image } from 'react-bootstrap'

export default function BoardExpand({ board, boardIndex }) {
  const {
    // expand,
    setShowImageModal,
    setSelectedImage,
    setNewImageURL,
    // selectedBoard,
  } = useContext(BoardsStateContext)
  const { images } = board
  return (
    <div
      className={`${styles['board-expand']}`}
      // className={`${styles['board-expand']} ${
      //   expand && boardIndex === selectedBoard
      //     ? styles['board-expand-show']
      //     : styles['']
      // }`}
      // style={{
      //   width: parentWidth - 16,
      //   left: (boardIndex + 1) % 2 === 0 ? -(parentWidth / 2) : 0,
      // }}
    >
      {images.map((image, i) => {
        return (
          <button
            className={`${styles['image-btn']}`}
            onClick={() => {
              setShowImageModal(true)
              setSelectedImage(image.id)
              setNewImageURL(
                `data:image/png;base64,${bufferToBase64(image.data.data)}`
              )
            }}
          >
            <Image
              key={image.id}
              src={`data:image/png;base64,${bufferToBase64(image.data.data)}`}
              alt={`Image of ${image.prompt}`}
              rounded={true}
            />
          </button>
        )
      })}
    </div>
  )
}
