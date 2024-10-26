import { Link } from 'react-router-dom'
const logo = "/assets/images/logo.png";

export const Logo = () => {
    
  return (
    <Link to="/home">
        <img src={logo} className="w-24" alt="logo" />
    </Link>
  )
}
