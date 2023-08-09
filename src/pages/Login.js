import { useContext, useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, error } = useLogin()
  const { isLoading, setIsLoading } = useContext(AuthContext)

  const [visible, setVisible] = useState(false)
  // console.log(visible)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await login(username, password)
    setIsLoading(false)
  }

  return (<div className="login">
    <h1><span>ALGORITM-COIN</span>ga xush kelibsiz!</h1>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Saytga kirish</h3>
      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label>Password:</label>
      <div className="login_password">
        <input
          type={`${visible ? "text" : "password"}`}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {visible ? <AiFillEyeInvisible onClick={() => setVisible(!visible)} className="aye_svg" /> : <AiFillEye onClick={() => setVisible(!visible)} className="aye_svg" />}
      </div>


      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
      <Link className="natija" to={"/client"}>Faqat natijani ko`rish</Link>
    </form>
  </div>)
}

export default Login