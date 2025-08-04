import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'
import AuthContext from './context/Authorisation/AuthContext';
import alertContext from './context/alert/AlertContext';

function SignUp() {
  const AlertContext = useContext(alertContext)
  const {showalert}=AlertContext
  const context = useContext(AuthContext)
  const {signUp}=context
  let navigate = useNavigate();
  const [credentials,setCredentials]=useState({name:"",email:"",password:""})
  const handleSubmit=async(e)=>{
    e.preventDefault()
    // API Integration
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/CreateUser`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
    });
    const json = await response.json(); // in response we will get the auth-token(the JWT associated with the user created)
    if(json.success){
      // store the auth-token and redirect
      signUp(json.token)
      showalert("Sign-in Successfull","success","success",3000)
      navigate('/login') // To navigate to the login page after the signUp is succesfull
    }
    else{
       showalert("Invalid Credentials","danger","Error",3000)// to display alert if sign up is not successful
    }
  }
  // this function will target the name attribute of the input field and set the value of the input field to the state
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div className="signup-page">
    <div className="signin-container">
        <h2 className="signin-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input type="text" className="form-control-signUp" onChange={onChange} id="name" name="name" value={credentials.name} placeholder="Enter your name" required/>
        </div>
        <div className="mb-3">
            <input type="email" className="form-control-signUp" onChange={onChange} id="email" name="email" value={credentials.email} placeholder="Enter your email" required/>
        </div>
        <div className="mb-3">
            <input type="password" className="form-control-signUp" onChange={onChange} id="password" name="password" value={credentials.password} placeholder="Enter your password" required/>
        </div>
        <button type="submit" className="signin-btn">Sign In</button>
        </form>
    </div>
  </div>
  )
}

export default SignUp
