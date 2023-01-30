import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Axios } from '../../api'
import { AuthContext } from '../../context/AuthContext'
import './login.scss'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../redux/usersSlice'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  const dispatch = useDispatch()
  const { user, loading, error } = useSelector(state => state.users)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
   dispatch(signIn({credentials,navigate}))
  }

  return (
    <div className="login">
      <div className="lContainer">
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
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.error.response.data.message}</span>}
      </div>
    </div>
  )
}

export default Login
