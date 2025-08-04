import React,{useContext, useState}from 'react'
import {useNavigate} from 'react-router-dom'
import './login.css'
import AuthContext from './context/Authorisation/AuthContext';
import alertContext from './context/alert/AlertContext';

function Login() {
  const AlertContext=useContext(alertContext)
  const {showalert}=AlertContext
  const context = useContext(AuthContext)
  const {login}=context
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({email:"",password:""}) //note states
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log("Form Submmitted")
    // API Integration
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/Login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json = await response.json(); // In response we will get the token(JWT)
    console.log(json)
    if(json.success){
      // store the auth-token and redirect
       login(json.token)
       showalert("Login Successfull","success","success",3000)
       navigate('/') // To navigate to the home page after the login is succesfull
    }
    else{
      showalert("Invalid Credentials","danger","Error",3000) // to display alert if login is not successful
    }
  }
  // this function will target the name attribute of the input field and set the value of the input field to the state
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div className="login-page">
    <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input type="email" className="login-form-control" onChange={onChange} value={credentials.email} id="email" name="email" placeholder="Enter your email"  required/>
        </div>
        <div className="mb-3">
            <input type="password" className="login-form-control" onChange={onChange} value={credentials.password} id="password" name="password" placeholder="Enter your password" required/>
        </div>
        <div className="remember-me mb-3">
            <div className="form-check">
            <input type="checkbox" id="rememberMe"/>
            <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <a href="#">Forgot Password?</a>
        </div>
        <button type="submit" className="btn-login">Login</button>
        </form>
    </div>
  </div>
  )
}

export default Login
