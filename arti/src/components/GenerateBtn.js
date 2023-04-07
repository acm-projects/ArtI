import PropTypes from 'prop-types'
import '../index.css'

const GenerateBtn = ({ color, text, onClick }) => {
  return (
  <button 
  onClick={onClick}
  className='generate-btn'>
    {text}
    </button>
  )
}


GenerateBtn.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default GenerateBtn