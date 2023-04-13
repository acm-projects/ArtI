import '../index.css'
import PortraitGenBtn from '../components/PortraitGenBtn'
import { useRef, useState } from 'react'
import PopUp from '../components/PopUp'
import axios from 'axios'

const PortraitGen = ({ user }) => {
  const ageInput = useRef(null)
  const genderInput = useRef(null)

  const [buttonPopup, setButtonPopup] = useState(false)
  const [image, setImage] = useState('')
  const [boardsArray, setBoardsArray] = useState([])

  //Function calls the portrait gen api
  async function handleChange() {
    const age = ageInput.current.value
    const gender = genderInput.current.value
    let url = ''

    if (age === '' && gender === 'None') {
      url = 'https://fakeface.rest/face/json'
    } else if (age === '' && (gender === 'male' || 'female')) {
      url = `https://fakeface.rest/face/json?gender=${gender}`
    } else if (age !== '' && gender === 'None') {
      const max_age = parseInt(age) + 1
      const min_age = parseInt(age) - 1
      url = `https://fakeface.rest/face/json?minimum_age=${min_age}&maximum_age=${max_age}`
    } else {
      const max_age = parseInt(age) + 1
      const min_age = parseInt(age) - 1
      url = `https://fakeface.rest/face/json?minimum_age=${min_age}&maximum_age=${max_age}&gender=${gender}`
    }
    console.log(url)

    axios
      .get(url)
      .then((res) => {
        const uri = res.data.image_url
        setImage(uri)
        console.log(`image: ${image}`)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <div className='portrait-gen-container'>
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

      <div className='portrait-input-container'>
        <h2>What will this portrait look like?</h2>

        <div className='text-inputs'>
          <input
            ref={ageInput}
            className='age-input'
            type='text'
            placeholder='Age'
          />

          <div className='gender-input'>
            <label htmlFor='Gender'>Gender</label>
            <select ref={genderInput} name='Gender' id='Gender'>
              <option>None</option>
              <option value='female'>female</option>
              <option value='male'>male</option>
            </select>
          </div>
        </div>

        <PortraitGenBtn onClick={handleChange} text='Generate' />
        {<img src={image} alt='AI Face' />}
        <button type='button' onClick={handleChange}>
          New image
        </button>
      </div>

      <div className='popup-container'>
        <button onClick={() => setButtonPopup(true)}>save</button>
        {/* <PopUp
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          boards={boardsArray}
        ></PopUp> */}
      </div>
    </div>
  )
}

export default PortraitGen
