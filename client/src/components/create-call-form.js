import React from 'react'
import axios from 'axios'
import {withCookies} from 'react-cookie'


class CreateCallForm extends React.Component{
    constructor(props){
      super(props);
      this.state ={
        created:false,
        date: '',
        theme: '',
        invalidData: false
      }
    }

    componentDidMount = async ()=>{
      
    }

    submitForm = async (event)=>{
      event.preventDefault();
      const { cookies } = this.props;
      await axios({
        url:process.env.REACT_APP_BACKEND_URI+'/api/calls',
        method: 'post',
        data: {date:this.state.date, theme:this.state.theme},
        headers: {
        "Access-Control-Allow-Origin": "*",
        authToken: cookies.cookies.authToken
      }
      }).then((response) => {
        console.log(response)
        
        if(response.status===201){
          this.setState({created:true, invalidData:false})
         }else{
        this.setState({created:false, invalidData:true})}
      }).catch((error) => {
        alert("Acesso não autorizado, apenas administradores podem criar chamadas. Por favor, faça o seu login novamente")
      this.setState({created:false, invalidData:false})
    })  

    }

    
    invalidMessage = ()=>{
      if(this.state.invalidData){
        return<p>date ou senha não encontrados</p>
      }
    }
    createdMessage = ()=>{
      if(this.state.created){
        return<p>A sua Call foi criada</p>
      }
    }

    render(){
      return(
        <form className ="login-form" >

            <label>
            <span>Data:</span>
            <input type = 'datetime-local' name = "date" value = {this.state.date} onChange ={(e)=>{this.setState({date:e.target.value, invalidData:false, created: false})}}></input>
            </label>
            <label>
            <span>Tema:</span>
            <input type = 'text' name = "theme" value = {this.state.theme} onChange ={(e)=>{this.setState({theme:e.target.value, invalidData:false,  created: false})}}></input>
            </label>
            <div>
            <button type="submit" onClick={this.submitForm}>Enviar</button>
            </div>
            {this.invalidMessage()}
            {this.createdMessage()}
        </form>
        );

    }
    

  }

  export default withCookies(CreateCallForm);