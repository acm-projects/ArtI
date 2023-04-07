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

const ImageGen = ({ user }) => {
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
          console.log(response.data)
          const url = `data:image/png;base64,${response.data.response.url}`
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
              <div>
                <button onClick={randomizePrompt}> Randomize </button>
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
      </div> */}
      <img src={imageUrl} alt={promptInput} className='img' />
    </div>
  )
}

export default ImageGen
