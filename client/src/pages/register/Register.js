import { useNavigate } from 'react-router-dom'
import './register.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { signUp } from '../../redux/usersSlice'

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  // const { user, loading, error, dispatch } = useContext(AuthContext)
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector(state => state.users)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch(signUp({ credentials, navigate }))
  }

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          required={true}
          placeholder="name"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          required={true}
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="repeat password"
          id="confirmPassword"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Register
        </button>
        {error && <span>{error.error.response.data.message}</span>}
      </div>
    </div>
  )
}

export default Register
