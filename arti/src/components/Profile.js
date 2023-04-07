import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import '../styles/Profile.css'

export default function Profile({ user }) {
  const { username, email, firstName, lastName } = user
  const [editForm, setEditForm] = useState(false)

  function handleLogout() {
    sessionStorage.removeItem('arti')
  }

  return (
    <>
      <Container>
        {/* Welcome Person and Logout Button */}
        <Row className='py-4'>
          <Col xs={6} md={8}>
            <div className='profile-intro'>
              {!user.profilePic ? (
                <h1>
                  <i className='bi bi-person-circle'></i>
                </h1>
              ) : (
                <img src={user.profilePic} alt='Profile Pic' />
              )}

              <h1>Hello, {firstName}</h1>
            </div>
          </Col>
          <Col xs={6} md={4} className='d-flex flex-row-reverse'>
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
          </Col>
        </Row>

        {/* Personal Information */}
        <Row className='py-4'>
          <Col xs={12}>
            <h2 className='profile-header'>Your Info</h2>
          </Col>
          <Form>
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
        </Row>

        {/* Settings & Privacy */}
        <Row className='py-4'>
          <Col xs={12}>
            <h2 className='profile-header'>Settings & Privacy</h2>
          </Col>
        </Row>
      </Container>
    </>
  )
}
