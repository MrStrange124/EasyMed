import { useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { FaUserAlt, FaLock, FaEnvelope, FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from 'react-icons/fa'
import './Login.css'


const Login = () => {
  const [isActive, setIsActive] = useState(true)
  const [invalidCredentials, setInvalidCredentials] = useState(false)
  const [cookies, setCookie] = useCookies(['jwt']);
  const usernameRef = useRef()
  const passwordRef = useRef()

  const toggleClass = () => {
    setIsActive(!isActive)
  }

  if (false)
    console.log(cookies)

  const loginBtnHandler = async (event) => {
    event.preventDefault()
    if (usernameRef.current.value.length < 5 || passwordRef.current.value.length < 4)
      return
    const response = await fetch("https://adi36n-easy-med.herokuapp.com/users/login", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: usernameRef.current.value,
        password: passwordRef.current.value
      })
    })
    if (response.status === 401) {
      setInvalidCredentials(true)
      return
    }
    const responseData = await response.json()
    setCookie('jwt', responseData.token, { maxAge: 60 * 60 * 24 * 30 });
  }

  const LoginPage = () => {
    return (
      <div className={isActive ? "container" : "container sign-up-mode"}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign In</h2>
              <div className="input-field">
                {/* <i className="fas fa-user"></i> */}
                <FaUserAlt />
                <input
                  type="text"
                  placeholder="Username"
                  name="Username"
                  id="Username"
                  ref={usernameRef}
                />
              </div>
              <div className="input-field">
                {/* <i className="fas fa-lock"></i> */}
                <FaLock />
                <input type="password" placeholder="password" ref={passwordRef} />
              </div>
              {invalidCredentials && <p className="error_msg">Invalid Credentials</p>}
              <button className="btn solid" onClick={loginBtnHandler}>Sign In</button>
              <p className="social-text">Or sign up with social platforms</p>
              <div className="social-media">
                <a href="https://www.facebook.com/" className="social-icon">
                  {/* <i className="fab fa-facebook-f"></i> */}
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com/" className="social-icon">
                  {/* <i className="fab fa-twitter"></i> */}
                  <FaTwitter />
                </a>
                <a href="https://www.google.com/" className="social-icon">
                  {/* <i className="fab fa-google"></i> */}
                  <FaGoogle />
                </a>
                <a href="https://www.linkedin.com/" className="social-icon">
                  {/* <i className="fab fa-linkedin-in"></i> */}
                  <FaLinkedinIn />
                </a>
              </div>
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title">Register</h2>
              <div className="input-field">
                {/* <i className="fas fa-user"></i> */}
                <FaUserAlt />
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                {/* <i className="fas fa-envelope"></i> */}
                <FaEnvelope />
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-field">
                {/* <i className="fas fa-lock"></i> */}
                <FaLock />
                <input type="password" placeholder="password" />
              </div>
              <input type="submit" className="btn" value="Register" />
              <p className="social-text">or sign up with social platforms</p>
              <div className="social-media">
                <a href="https://www.facebook.com/" className="social-icon">
                  {/* <i className="fab fa-facebook-f"></i> */}
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com/" className="social-icon">
                  {/* <i className="fab fa-twitter"></i> */}
                  <FaTwitter />
                </a>
                <a href="https://www.google.com/" className="social-icon">
                  {/* <i className="fab fa-google"></i> */}
                  <FaGoogle />
                </a>
                <a href="https://www.linkedin.com/" className="social-icon">
                  {/* <i className="fab fa-linkedin-in"></i> */}
                  <FaLinkedinIn />
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Are you new?</h3>
              <p>you can click on the next button to create your account !</p>
              <button className="btn transparent" id="sign-up-btn" onClick={toggleClass}>Register</button>
            </div>
            <img
              src="https://i.pinimg.com/originals/72/82/fe/7282fee6a0641482ab4391b9638ee46c.png"
              className="image"
              alt=""
            />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Do you already have an account?</h3>
              <p>Click down below to login</p>
              <button className="btn transparent" id="sign-in-btn" onClick={toggleClass}>Sign In</button>
            </div>
            <img
              src="https://i.pinimg.com/originals/77/29/f4/7729f497f9d0188fa35d41db45232cca.png"
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <LoginPage />
  )
}

export default Login;