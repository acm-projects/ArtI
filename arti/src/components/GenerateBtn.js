import PropTypes from 'prop-types'
import '../index.css'

const GenerateBtn = ({ color, text, onClick, onSubmit }) => {
  return (
    <button
      type='submit'
      onSubmit={onSubmit}
      onClick={onClick}
      className='generate-btn'
    >
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
