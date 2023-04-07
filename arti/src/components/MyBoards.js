import "../utils/MyBoardsIndex.css";
import { Container, FormControl, Modal, Button } from "react-bootstrap";
import React, { useState } from "react";

const MyBoards = () => {
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
            <Button variant="primary" onClick={handleCloseModal}>
              Add Board
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default MyBoards;
