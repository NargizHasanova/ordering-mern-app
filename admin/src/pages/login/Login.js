import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Axios } from '../../Axios'
import { AuthContext } from '../../context/AuthContext'
import './login.scss'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  })

  const { user, loading, error, dispatch } = useContext(AuthContext)
  console.log(user)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    try {
      const { data } = await Axios.post('/auth/login', credentials)
      console.log(data)
      if (data.isAdmin) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: data,
        })
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: { message: "you are not Admin!" } })
      }
      navigate('/')
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: { message: "user not found" } })
    }
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
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login
