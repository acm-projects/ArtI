import "../utils/MyBoardsIndex.css";
import {
  Container,
  FormControl,
  Modal,
  Button,
  Card,
  Image,
  Dropdown,
} from "react-bootstrap";
import React, { useState } from "react";

const MyBoards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalSearchTerm, setModalSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [boards, setBoards] = useState([]);
  const [newImageURL, setNewImageURL] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleAddBoard = () => {
    if (boards.some((board) => board.name === modalSearchTerm)) {
      alert("A board with this name already exists.");
      return;
    }

    const newBoard = {
      name: modalSearchTerm,
      images: newImageURL ? [newImageURL] : [],
    };
    setBoards([...boards, newBoard]);
    setModalSearchTerm("");
    setNewImageURL("");
  };

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

  const handleBoardClick = (boardIndex) => {
    setSelectedBoard(boardIndex);
  };

  const closeBoard = () => {
    setSelectedBoard(null);
  };

  const handleShowAddImageModal = () => {
    setShowAddImageModal(true);
  };

  const handleCloseAddImageModal = () => {
    setShowAddImageModal(false);
  };

  const handleAddImageToBoard = () => {
    const newBoards = [...boards];
    newBoards[selectedBoard].images.push(newImageURL);
    setBoards(newBoards);
    setNewImageURL("");
    handleCloseAddImageModal();
  };

  return (
    <div>
      <h1>Welcome, USER </h1>

      <Container className="search-bar">
        <FormControl
          type="text"
          placeholder="Search for Board..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <Button
          variant="primary"
          onClick={handleShowModal}
          className="add-boards-button"
        >
          Create Board
        </Button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Board</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Name Board</p>
            <FormControl
              type="text"
              placeholder="e.g. background inspo"
              value={modalSearchTerm}
              onChange={handleModalSearch}
            />

            <p>Image URL</p>
            <FormControl
              type="text"
              placeholder="https://example.com/image.jpg"
              value={newImageURL}
              onChange={(e) => setNewImageURL(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddBoard}>
              Add Board
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="boards-container">
          {boards.map((board, boardIndex) => (
            <Card
              key={boardIndex}
              style={{ width: "18rem", margin: "1rem" }}
              onClick={() => handleBoardClick(boardIndex)}
            >
              <Card.Body>
                <Card.Title>{board.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>

        {selectedBoard !== null && (
          <div className="board-popup">
            <div className="board-popup-background" onClick={closeBoard} />
            <div className="board-popup-content">
              <h2>{boards[selectedBoard].name} </h2>
              {boards[selectedBoard].images.map((imageURL, imageIndex) => (
                <div
                  key={imageIndex}
                  onClick={() => {
                    setNewImageURL(imageURL);
                    setShowImageModal(true);
                  }}
                >
                  <Image
                    src={imageURL}
                    alt="Image"
                    className="image-thumbnail"
                    thumbnail
                  />
                </div>
              ))}

              <Button variant="primary" onClick={handleShowAddImageModal}>
                Add Image
              </Button>
              <Button variant="secondary" onClick={closeBoard}>
                Delete Board
              </Button>
              <Button variant="secondary" onClick={closeBoard}>
                Close
              </Button>
            </div>
            <Modal show={showAddImageModal} onHide={handleCloseAddImageModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Add Image to {boards[selectedBoard]?.name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Image URL</p>
                <FormControl
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={newImageURL}
                  onChange={(e) => setNewImageURL(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddImageModal}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleAddImageToBoard}>
                  Add Image
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
        <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image src={newImageURL} alt="Image" fluid />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowImageModal(false)}
            >
              Close
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowImageModal(false)}
            >
              Delete Image
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default MyBoards;
