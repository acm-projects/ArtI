import '../index.css'
import GenerateBtn from './GenerateBtn'
import { Row, Col, Container } from 'react-bootstrap'
import { useState } from 'react'
import PopUp from './PopUp'
import '../styles/PopUp.css'
import axios from 'axios'


const ImageGen = ({user}) => {
  const [boardsArray, setBoardsArray] = useState([])

  //button functionality of popup, show/hide popup
  const [show, setShow] = useState(false)
  const handleShow = async () => {
    setShow(true)
    const response=await axios(`/api/v1/boards/${user.username}`)
    console.log(response)
    if(response.status === 200)
    {
      setBoardsArray(response.data)
      console.log('calling api',boardsArray) 
    }
    }
  const handleClose = () => setShow(false)

  return (
    <div className='generator-container'>
      <div className='bg-circle circle1'></div>
      <div className='bg-circle circle2'></div>
      <div className='bg-circle circle3'></div>
      <div className='bg-circle circle4'></div>

      <div className='tiny-lines line1'></div>
      <div className='tiny-lines line2'></div>
      <div className='tiny-lines line3'></div>
      <div className='tiny-lines line4'></div>

      {/* <header>
      <h1>
        Portrait Generator
      </h1>
      </header> */}

      <Container>
        <div className='image-input-container'>
          <Row>
            <Col>
              <h3>Enter a detailed description for what you want to create.</h3>

              <div className='generate-bar'>
                <input
                  className='image-input'
                  type='text'
                  placeholder='Enter your prompt...'
                />
                <GenerateBtn text='Generate' />
              </div>
            </Col>
          </Row>
        </div>        
      </Container>
      <div className='popup-container'>
        <div className='generated-img'>

          <button className='popup-button' variant="primary" onClick={handleShow}>
          <i className="bi bi-plus-lg"></i>
          </button>

          <PopUp
          user={user}
            show={show}
            handleClose={handleClose}
            boards={boardsArray}
          />

          <img
            src='https://pbs.twimg.com/media/EbvB35oXgAAiQsH.jpg'
            alt='img of travis scott raging'
            className='img'
          />

        </div>
      </div>
    </div>
  )
}

export default ImageGen
