import './style.css'
import React from 'react'
import CreateCallForm from '../../components/create-call-form.js'
import { CookiesProvider } from 'react-cookie';
import logo from "../../assets/logo.svg"



class CreateCall extends React.Component{
  
/*
  static async getInitialProps(ctx) {
  
    const resp  =await this.verifySession(ctx);
  
    return resp;
  }
*/
  render(){
  return (
    <div className="container">
      <main className="main-create-call">
        <CookiesProvider>
          <CreateCallForm styleclass="loginform"/>
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

export default CreateCall;

