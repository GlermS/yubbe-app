import './style.css'
import React from 'react'
import SignUpForm from '../../components/signup-form.js'
import { CookiesProvider } from 'react-cookie';
import logo from "../../assets/logo.svg"
import {Link} from "react-router-dom"



class Signup extends React.Component{
  
/*
  static async getInitialProps(ctx) {
  
    const resp  =await this.verifySession(ctx);
  
    return resp;
  }
*/
  render(){
  return (
    <div className="container">
      <main className="main-signup">
        <CookiesProvider>
          <SignUpForm styleclass="loginform"/>
        </CookiesProvider>
      </main>

      <footer className="footer">
        <p>
          Powered by: 
        </p>
        <Link to="/">
        <img src={logo} alt="Yubbe Logo" className="logo" />
        </Link>
      </footer>
    </div>
  )}
  
}

export default Signup;

