import "../utils/MyBoardsIndex.css";
import { Container, FormControl, Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from 'axios'

const MyBoards = ({user}) => {
  console.log(user)
  const [searchTerm, setSearchTerm] = useState("");
  const [modalSearchTerm, setModalSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalSearch = (event) => {
    setModalSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Welcome, USER </h1>

      <Container className="search-bar">
        <FormControl
          type="text"
          placeholder="Search for Composition..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <Button
          variant="primary"
          onClick={handleShowModal}
          className="add-boards-button"
        >
          Add Boards
        </Button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Boards</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>Name Board</p>
            <FormControl
              type="text"
              placeholder="e.g. background inspo"
              value={modalSearchTerm}
              onChange={handleModalSearch}
            />   
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => createNewBoard(user, modalSearchTerm)}>
              Add Board
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

async function getBoards(user){
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

async function saveToBoards(user){
  try{
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
      isCustomThumbnail: isCustomThumbnail
    })

    console.log(response)

  }catch(error){
    console.log(error.message)
  }
}

async function createNewBoard(user, newBoardName){
  const username = user.username
  const boardName = newBoardName
  const images = []
  const thumbnail = ''
  const customThumbnail = false
  console.log(username)

  try {
    const postUrl = 'http://localhost:8080/api/v1/boards'
    const response = await axios.post(postUrl, {
      username: username,
      boardName: boardName,
      images: images,
      thumbnail: thumbnail,
      customThumbnail: customThumbnail
    })
  
    console.log(response)
  } catch (error) {
    console.log(error.message)
  }
}

async function getSingleBoard(user){
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

async function deleteBoard(user){
  try {
    const username = user.username
    const boardName = user.boardName
    const deleteUrl = `http://localhost:8080/api/v1/boards/${username}`
    
    const response = await axios.delete(deleteUrl, {boardName: boardName})
    console.log(response)

  } catch (error) {
    console.log(error.message)
  }
}

async function deleteImage(user){
  try{
    const username = user.username
    const boardName = user.boardName
    const images = user.images
    const imagesToDelete = []
    const isCustomThumbnail = user.customThumbnail
    const patchUrl = `http://localhost:8080/api/v1/boards/${username}`

    const response = await axios.patch(patchUrl, {
      boardName: boardName,
      images: images,
      imageUpdates: imagesToDelete,
      deleteBoard: true,
      isCustomThumbnail: isCustomThumbnail
    })

    console.log(response)

  }catch(error){
    console.log(error.message)
  }
}

async function changeThumbnailOrBoardName(user){
  try{
    const username = user.username
    const boardName = user.boardName
    const thumbnailImage = ''
    const newBoardName = ''
    const patchUrl = `http://localhost:8080/api/v1/boards/${username}/${boardName}`

    const response = await axios.patch(patchUrl, {
      newThumbnailUrl: thumbnailImage,
      newBoardName: newBoardName
    })
    console.log(response)

  } catch(error){
    console.log(error.message)
  }
}


export default MyBoards;
