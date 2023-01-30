import { Link, useNavigate } from 'react-router-dom'
import './navbar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/usersSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)

  function quit(){
    dispatch(logout())
    navigate("/")
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logo">
          <span>Ordering.com</span>
        </Link>
        {user ? (
          <div className="loggedIn" style={{ display: "flex" }}>
            <h2>{user.username}</h2>
            <button className="navButton" onClick={quit}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <Link to={'/register'}>
              <button className="navButton">Register</button>
            </Link>
            <Link to={'/login'}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
