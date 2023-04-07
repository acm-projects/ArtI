import '../index.css'
import GenerateBtn from './GenerateBtn'
import PopUp from './PopUp'
import axios from 'axios'
import { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
// import axios from 'axios'

const ImageGen = () => {
  const [buttonPopup, setButtonPopup] = useState(false)
  const [promptInput, setPrompt] = useState('')
  const [imageUrl, setImage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    console.log(`prompt: ${promptInput}`)
    const postUrl = 'http://localhost:8080/api/v1/imageai'
    try {
      if (promptInput.match('[a-z0-9]')) {
        const response = await axios.post(postUrl, { prompt: promptInput })
        if (response.status === 200) {
          const url = response.data.response
          setImage(url)
          console.log(imageUrl)
        }
      } else throw new Error('No Prompt Entered!')
    } catch (error) {
      console.log(error.message)
    }
  }

  const onChangeHandler = (event) => {
    setPrompt(event.target.value)
  }

  async function randomizePrompt() {
    console.log('random function called')
    const postUrl = 'http://localhost:8080/api/v1/text'
    try {
      const response = await axios.post(postUrl)
      if (response.status === 200) {
        console.log(response.data.message)
        const randomizePrompt = response.data.prompt
        setPrompt(randomizePrompt)
        console.log(promptInput)
      }
    } catch (error) {}
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
                  className='image-input'
                  onChange={onChangeHandler}
                  type='text'
                  placeholder='Enter your prompt...'
                  value={promptInput}
                />
                <GenerateBtn onClick={handleSubmit} text='Generate' />
              </div>
              <div>
                <button onClick={randomizePrompt}> Randomize </button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      {<div className='popup-container'>
        <button onClick={() => setButtonPopup(true)}>save</button>
        <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}></PopUp>
        <div className='generated-img'>
          <img
            src = {imageUrl}
            xalt = {promptInput}
            className='img'
          />
        </div>
      </div> }
    </div>
  )
}

export default ImageGen
