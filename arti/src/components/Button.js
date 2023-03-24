import PropTypes from 'prop-types'
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
  text: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
