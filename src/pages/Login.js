import { useContext, useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, error } = useLogin()
  const { isLoading, setIsLoading } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(async () => {
      await login(username, password)
      setIsLoading(false)
    }, 1000);
  }

  return (<div className="">
    <h1>Welcome to Coin check</h1>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

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

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
      <Link className="natija" to={"/client"}>Faqat natijani ko`rish</Link>
    </form>
  </div>)
}

export default Login