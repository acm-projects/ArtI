import PropTypes from 'prop-types'
import '../index.css'

const PortraitGenBtn = ({ text, onClick }) => {
  return (
  <button 
  type='submit'
  onClick={onClick}
  className='portrait-btn'>
    {text}
    </button>
  )
}


PortraitGenBtn.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
}

export default PortraitGenBtn
