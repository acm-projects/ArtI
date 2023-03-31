import '../index.css'
import GenerateBtn from './GenerateBtn'
import PopUp from './PopUp'
import { useRef, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
// import axios from 'axios'

const ImageGen = () => {
  const [buttonPopup, setButtonPopup] = useState(false)
  const [show, setShow] = useState(false)
  const prompt = useRef(null)

  async function generateImage() {
    try {
    } catch (error) {
      console.log(error)
    }
  }

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
                  ref={prompt}
                  className='image-input'
                  type='text'
                  placeholder='Enter your prompt...'
                />
                <GenerateBtn onClick={generateImage} text='Generate' />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      {/* <div className='popup-container'>
        <button onClick={() => setButtonPopup(true)}>save</button>
        <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}></PopUp>
        <div className='generated-img'>
          <img
            src='https://pbs.twimg.com/media/EbvB35oXgAAiQsH.jpg'
            alt='img of travis scott raging'
            className='img'
          />
        </div>
      </div> */}
    </div>
  )
}

export default ImageGen
