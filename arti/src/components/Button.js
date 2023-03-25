import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Button = ({ color, text, onClick, style }) => {
  return (
    <button
      onClick={onClick}
      className='btn'
      style={{ textDecoration: 'none', style }}
    >
      <Link to='/imagegen'>{text}</Link>
    </button>
  )
}

Button.propTypes = {
<<<<<<<<< Temporary merge branch 1
    text: PropTypes.string,
    onClick: PropTypes.func,
=========
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
>>>>>>>>> Temporary merge branch 2
}

export default Button
