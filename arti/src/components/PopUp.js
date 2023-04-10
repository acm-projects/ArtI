import '../index.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { DropdownButton,Dropdown } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'

const saveImage = () => {

    //log for on click
    console.log('Image Saved!')

    //log image link for API 
    console.log('https://pbs.twimg.com/media/EbvB35oXgAAiQsH.jpg')
}


export const Form = () => {
  return(
    <div className='form-container'>
      <form className='popup-form'>
        <Button 
        className='save-button'
        type='submit'
        onClick={saveImage(true)}
      >
        Save
      </Button>
      </form>

    </div>
  )
}

//save the image to the selected board(unsure if this a backened thing, so just logging that it happened)
export const pullBoard = () => {
  return(
    console.log(`image saved to ${board.boardName} board`)
  )
}

//contents of popup
export default function PopUp({show, handleClose, boards}) {

  return (
    <Modal
      show = {show} onHide={handleClose}
      size = 'lg'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id = 'contained-modal-title-vcenter'>
          SAVE ART
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Choose a board...
        </h4>
        //dropdown pulling boards from api
        <DropdownButton id='board-select' title='Choose Board'>
          {
            boards.map((board,i) => {
              return <Dropdown.Item key={i} onClick={pullBoard(true)}> { board.boardName} </Dropdown.Item>
            })
          }
        </DropdownButton>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>close</Button>
      </Modal.Footer>
    </Modal> 
    
    
  )
}
