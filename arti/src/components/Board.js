import React from 'react'
import { Card } from 'react-bootstrap'
import styles from '../styles/board.module.css'

export default function Board(boardDetails) {
  const { boardName, images } = boardDetails
  console.log(boardDetails)
  return (
    <>
      <button className={styles['board-btn']}>
        <Card>
          <Card.Body>{boardDetails.boardName}</Card.Body>
        </Card>
      </button>
    </>
  )
}
