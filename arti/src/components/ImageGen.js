import '../index.css'
import GenerateBtn from './GenerateBtn'
import PopUp from './PopUp'
import axios from 'axios'
import { useRef, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
// import axios from 'axios'

const ImageGen = () => {
  const [buttonPopup, setButtonPopup] = useState(false)
  const promptInput = useRef('')
  const [imageUrl, setImage] = useState('')

  console.log(`prompt: ${promptInput.current.value}`)

  async function handleSubmit(e) {
    e.preventDefault()
    const postUrl = 'http://localhost:8080/api/v1/generate'
    try {
      if (promptInput.current.value !== '') {
        const response = await axios.post(postUrl, {
          prompt: promptInput.current.value,
          isRandom: false,
        })
        if (response.status === 200) {
          const url = response.data.response
          setImage(url)
          console.log(imageUrl)
        }
        console.log(imageUrl)
      } else throw new Error('No Prompt Entered!')
    } catch (error) {
      console.log(error.message)
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
                  ref={promptInput}
                  type='text'
                  placeholder='Enter your prompt...'
                />
                <GenerateBtn onClick={handleSubmit} text='Generate' />
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
            src = {imageUrl}
            alt = {promptInput.current.value}
            className='img'
          />
        </div>
      </div> */}
    </div>
  )
}

export default ImageGen
