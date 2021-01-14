import React from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {withCookies} from 'react-cookie'
import {verifySession} from './session-verifier'


class LoginForm extends React.Component{
    constructor(props){
      super(props);
      this.state ={
        session:false,
        email: '',
        password: '',
        invalidData: false
      }
    }

    componentDidMount = async ()=>{
      const { cookies } = this.props.cookies;
      const respo = await verifySession(cookies)
      console.log(respo.data)
      if (respo.data){
        if(respo.data.approved){
          this.setState({session:true})
        }else{
          if(this.state.session){
            this.setState({session:false})
          }
        }
      } else{
        if(this.state.session){
          this.setState({session:false})
        }        
      }
    }

    submitForm = async (event)=>{
      event.preventDefault();
      await axios({
        url:process.env.REACT_APP_BACKEND_URI+'/api/login',
        method: 'post',
        data: {email:this.state.email, password:this.state.password},
        headers: {
        "Access-Control-Allow-Origin": "*"
      }
      }).then((response) => {
        
        this.props.cookies.set("authToken", String(response.data.authToken),{path:'/'});
        if(response.data.approved){
          this.setState({session:true, invalidData:false})
        }else{
          this.setState({session:false, invalidData:true})
       }

      }).catch((error) => {this.setState({invalidData:true})})  

    }
    redirect = ()=>{
      //console.log(session)
      if(this.state.session){
        return <Redirect to="/"/>
      }else{
        return []
      }
    }
    invalidMessage = ()=>{
      if(this.state.invalidData){
        return<p>Email ou senha não encontrados</p>
      }
    }

    render(){
      return(
        <form className ="login-form" >
            {this.redirect()}
            <label>
            <span>Email:</span>
            <input type = 'email' name = "email" value = {this.state.email} onChange ={(e)=>{this.setState({email:e.target.value, invalidData:false})}}></input>
            </label>
            <label>
            <span>Senha:</span>
            <input type = 'password'name = "password" value = {this.state.password} onChange ={(e)=>{this.setState({password:e.target.value, invalidData:false})}}></input>
            </label>
            <div>
            <button type="submit" onClick={this.submitForm}>Enviar</button>
            </div>
            {this.invalidMessage()}
        </form>
        );

    }
    

  }

  export default withCookies(LoginForm);