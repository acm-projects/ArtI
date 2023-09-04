import '../index.css'
import '../styles/pages/ImageGen.css'
import GenerateBtn from '../components/GenerateBtn'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { createContext, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import PopUp from '../components/PopUp'
import axios from 'axios'
import Backdrop from '../components/Backdrop'
// import Loading from '../components/Loading'
import { ColorExtractor } from 'react-color-extractor'

export const ItemsContext = createContext()

const ImageGen = () => {
  //button functionality of popup, show/hide popup
  const [show, setShow] = useState(false)
  const [promptInput, setPrompt] = useState('')
  const [image, setImage] = useState({})
  const [showSaving, setShowSaving] = useState(false)
  const [disabledItems, setDisabledItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [colorPalette, setColorPalette] = useState()


  const values = {
    disabledItems,
    setDisabledItems,
  }

  // Functions for showing/closing modal popup
  const handleShow = async () => {
    try {
      setShow(true)
      setLoading(false)
    } catch (error) {
      console.error(error.message)
    }
  }
  const handleClose = () => {
    setShow(false)
    setShowSaving(false)
    setDisabledItems([])
  }

  // Submits the prompt to generate an image from our API
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)    

    setIsVisible(!isVisible && setLoading(true))


    const postUrl = '/api/v1/imageai'
    try {
      if (promptInput.match('[a-z0-9]')) {
        // makes sure that there is a prompt
        const response = await axios.post(postUrl, { prompt: promptInput })
        if (response.status === 200) {
          const id = response.data.response.id
          // const url = `data:image/png;base64,${response.data.response.url}`
          await setImage({
            id: id,
            data: response.data.response.url,
            prompt: response.data.response.prompt,
          })
          console.log('this is from image gen ', image)
          handleShow()
        }
      } else throw new Error('No Prompt Entered!')
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
    setIsVisible(false);
  }

  const onChangeHandler = (event) => {
    setPrompt(event.target.value)
  }

  async function randomizePrompt() {
    const postUrl = '/api/v1/text'
    try {
      const response = await axios.post(postUrl)
      if (response.status === 200) {
        const randomizePrompt = response.data.prompt
        setPrompt(randomizePrompt)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <ItemsContext.Provider value={values}>
      <div className='generator-container'>

        <Backdrop
          page={'imagegen'}
          loading={loading}
          colorPalette={colorPalette}
        />
        <Row className='my-auto w-100'>
          <Container fluid>

            <div className='image-input-container'>
              <Row>
                <Col>
                  <h3>
                    Enter a detailed description for what you want to create.
                  </h3>

                  <form className='generate-bar my-4' onSubmit={handleSubmit}>
                    <input
                      className='image-input'
                      onChange={onChangeHandler}
                      type='text'
                      placeholder='Enter your prompt...'
                      value={promptInput}
                    />
                    <GenerateBtn
                      onClick={handleSubmit}
                      onSubmit={handleSubmit}
                      text='Generate'
                    />
                    <ColorExtractor
                      src={`data:image/png;base64,${image.data}`}
                      getColors={(colors) => setColorPalette(colors)}
                    />
                  </form>
                  {/* {loading && (
                    <div>
                      <Loading />
                    </div>
                  )} */}
                  <div className='btn-wrapper'>
                    <Button variant='secondary' onClick={randomizePrompt}>
                      Randomize Prompt
                    </Button>
                  </div>
                  <div className='popup-container'>
                    <div className='generated-img'>
                      <PopUp
                        show={show}
                        handleClose={handleClose}
                        image={image}
                        showSaving={showSaving}
                        setShowSaving={setShowSaving}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </Row>
      </div>
    </ItemsContext.Provider>
  )
}
export default ImageGen
