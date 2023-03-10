import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

const Button = ({ color, text, onClick }) => {
  return (
    <button onClick={onClick} className='btn'>
      {text}
      {/* <Link to='/imagegen'>{text}</Link> */}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
