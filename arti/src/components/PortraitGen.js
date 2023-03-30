import '../index.css'
import PortraitGenBtn from './PortraitGenBtn'
import { useState } from 'react';
import PopUp from './PopUp';

const PortraitGen = () => {

  const [buttonPopup, setButtonPopup]=useState(false);

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
        <h2>
          What will this portrait look like?
        </h2>

        <div className='text-inputs'>
          <input className='age-input'
            type= 'text'
            placeholder='Age' />

        <div className='gender-input'>

          <label for='Gender'>Gender</label>
          <select name='Gender' id='Gender'>
            <option>Gender</option>
            <option value='female'>female</option>
            <option value='male'>male</option>
          </select>

        </div>

        </div>

        <PortraitGenBtn text= 'Generate' />
        
      </div>
      <div className='popup-container'>
      <button onClick={() => setButtonPopup(true)}>
        save
      </button>
        <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
        </PopUp>

      </div>
    </div>


  )
}


export default PortraitGen
