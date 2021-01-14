import './style.css'
import React from 'react'
import SignUpForm from '../../components/signup-form.js'
import { CookiesProvider } from 'react-cookie';
import logo from "../../assets/logo.svg"



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
        <img src={logo} alt="Yubbe Logo" className="logo" />
      </footer>
    </div>
  )}
  
}

export default Signup;
