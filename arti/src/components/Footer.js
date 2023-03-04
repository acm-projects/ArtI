//lnk to signup page from login page
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Link to= "/SignUpForm">
        New to ArtI? Sign Up.
      </Link>
    </footer>
  )
}


export default Footer