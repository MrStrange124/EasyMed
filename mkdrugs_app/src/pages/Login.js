import { useState } from 'react'
import './Login.css'


const Login = props => {
  const [isActive, setIsActive] = useState(true)
  const toggleClass = () => {
    setIsActive(!isActive)
  }

  const LoginPage = () => {
    return (
      <div className={isActive ? "container" : "container sign-up-mode"}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign In</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  name="Username"
                  id="Username"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="password" />
              </div>
              <input type="button" value="Sign In" className="btn solid" />
              <p className="social-text">Or sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title">Register</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="password" />
              </div>
              <input type="submit" className="btn" value="Register" />
              <p className="social-text">or sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
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
              <p>Login</p>
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