import React from 'react'
import LoginAuthetication from '../authentication/login-authentication'

class LoginForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        password:'',
      }
    }
    handleChange = (event)=>{
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit = (event)=>{
      let authentication = new LoginAuthetication()
      let check = authentication.authenticate(this.state.email, this.state.password)
      console.log(check)
      if (check){
        alert("Passou")
      }else{
        alert("Não passou")
      }
    }
  
    render() {
      return(
        <form className ={this.props.styleClass}>
            <label>
            <span>Email:</span>
            <input type = 'email' name = "email" value = {this.state.email} onChange ={this.handleChange}></input>
            </label>
            <label>
            <span>Senha:</span>
            <input type = 'password'name = "password" value = {this.state.password} onChange ={this.handleChange}></input>
            </label>
            <button type="submit" onClick={this.handleSubmit}>Enviar</button>
        </form>
        );
    }
  }

  export default LoginForm;