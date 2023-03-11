import '../index.css'
import PortraitGenBtn from './PortraitGenBtn'

const PortraitGen = () => {
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

          <input className='gender-input'
            type= 'text'
          placeholder='Gender' />

        </div>

        <PortraitGenBtn text= 'Generate' />
        
      </div>

      
    </div>


  )
}


export default PortraitGen
