import './style.css'
import LoginForm from '../../components/login-form.js'
import React from 'react'
import logo from "../../assets/logo.svg"


class Login extends React.Component{
  render(){
  return (
    <div className="container">
      <main className="main-login">
        <LoginForm styleclass="loginform"/>
      </main>

      <footer className="footer">
        <p>
          Powered by: 
        </p>
        <img src={logo} alt="Yubbe Logo" className="logo" />
      </footer>
    </div>
  )}
  
}

export default Login;

