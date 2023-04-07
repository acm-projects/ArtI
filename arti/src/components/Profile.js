import React, { useState } from 'react'
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import '../styles/Profile.css'

export default function Profile({ user, setIsLoggedIn }) {
  const { username, email, firstName, lastName } = user
  // const [editForm, setEditForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState(null)
  const [validImgType, setValidImgType] = useState(true)

  const handleModalClose = () => setShowModal(false)
  const handleModalShow = () => setShowModal(true)

  function handleLogout() {
    sessionStorage.removeItem('arti')
    setIsLoggedIn(false)
  }

  function changeProfilePic(e) {
    const fileType = e.target.files[0].type
    if (fileType === 'image/png' || fileType === 'image/jpeg') {
      setFile(e.target.files[0])
      setValidImgType(false)
    } else setValidImgType('Invalid Image Type')
    console.log(e.target.files[0])
    console.log(URL.createObjectURL(e.target.files[0]))
  }

  function sendProfilePic() {
    console.log('sendProfilePic')
    const formData = new FormData()

    formData.append('profilePicture', file, file.name)

    console.log(file)
  }

  return (
    <>
      <Container>
        {/* Welcome Person and Logout Button */}
        <Row className='py-4'>
          <div className='intro-wrapper'>
            <div className='profile-intro'>
              {!user.profilePic ? (
                <h1>
                  <button className='profile-pic-btn' onClick={handleModalShow}>
                    <i className='bi bi-person-circle'></i>
                  </button>
                </h1>
              ) : (
                <img src={user.profilePic} alt='Profile Pic' />
              )}

              <h1>Hello, {firstName}</h1>
            </div>

            <Button
              onClick={handleLogout}
              className='logout-wrapper'
              variant='secondary'
            >
              <h3>Logout</h3>
              <h3>
                <i className='bi bi-box-arrow-right'></i>
              </h3>
            </Button>
          </div>
        </Row>
        {/* Profile Picture Change Modal */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change Profile Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type='file'
              name='profile-pic'
              id='profile-pic'
              onChange={changeProfilePic}
              accept='.jpeg, .png, .jpg'
            />
            {validImgType ? (
              <></>
            ) : (
              <p className='text-danger'>Invald Image Type</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='primary'
              onClick={sendProfilePic}
              disabled={validImgType ? true : false}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Personal Information */}
        <Row className='py-4'>
          <Col xs={12}>
            <h2 className='profile-header'>Your Info</h2>
          </Col>
          <Col xs={12}>
            <Form className='w-100'>
              <fieldset disabled>
                <Row className='info-row'>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>First Name: </Form.Label>
                      <Form.Control defaultValue={firstName} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Last Name: </Form.Label>
                      <Form.Control defaultValue={lastName} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='info-row'>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Email: </Form.Label>
                      <Form.Control defaultValue={email} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Username: </Form.Label>
                      <Form.Control defaultValue={username} />
                    </Form.Group>
                  </Col>
                </Row>
              </fieldset>
            </Form>
          </Col>
        </Row>

        {/* Settings & Privacy */}
        <Row className='py-4'>
          <Col xs={12}>
            <h2 className='profile-header'>Settings & Privacy</h2>
          </Col>
          <Col xs={12} md={6}>
            <h3 className='my-3'>Category 1</h3>
            <Form>
              <Form.Switch label='Setting 1' />
              <Form.Switch label='Setting 2' />
              <Form.Switch label='Setting 3' />
            </Form>
          </Col>
          <Col xs={12} md={6}>
            <h3 className='my-3'>Category 2</h3>
            <Form>
              <Form.Switch label='Setting 1' />
              <Form.Switch label='Setting 2' />
              <Form.Switch label='Setting 3' />
            </Form>
          </Col>
        </Row>

        <Row className='py-4'>
          <Col xs={12}>
            <h2 className='profile-header'>Help & Support</h2>
          </Col>
        </Row>
      </Container>
    </>
  )
}
