import { useContext, useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { AuthContext } from "../context/AuthContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const navigate = useNavigate()
  const { isLoading, setIsLoading } = useContext(AuthContext)

  const { user } = useAuthContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error } = useSignup()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(async () => {
      await signup(username, password)
        .then(res => {
          navigate("/login")
          console.log(res)
        })
        .catch(error => console.log(error))
      setIsLoading(false)
    }, 1000);
    // console.log(username)
    // console.log(password)


  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup