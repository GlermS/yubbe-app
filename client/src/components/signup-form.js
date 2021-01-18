import {useState} from 'react'
import axios from 'axios'

function SignUpForm (props){
    const [ email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()

    const submitForm = async (event)=>{
      event.preventDefault();
      
      //const resp = 
      await axios({
        url:process.env.REACT_APP_BACKEND_URI+'/api/signup',
        method: 'post',
        data: {name, email, password}
      }).then((response) => {
        setMessage("Conta criada com sucesso")
        setEmail('')
        setName('')
        setPassword('')
        //router.replace('/login')
      }).catch((error) => {
        if(error.response.status===409){
          setMessage('Email já cadastrado')
        }
      })  

    }
  
    return(
      <form className ='signup-form' >
          <p>{message}</p>
          <label>
          <span>Nome:</span>
          <input type = 'text' name = "name" value = {name} onChange ={(e)=>{setName(e.target.value); }}></input>
          </label>
          <label>
          <span>Email:</span>
          <input type = 'email' name = "email" value = {email} onChange ={(e)=>{setEmail(e.target.value);setMessage('')}}></input>
          </label>
          <label>
          <span>Senha:</span>
          <input type = 'password'name = "password" value = {password} onChange ={(e)=>{setPassword(e.target.value)}}></input>
          </label>
          
          <div>
          <button type="submit" onClick={submitForm}>Enviar</button>
          </div>
          
      </form>
      );

  }

  export default SignUpForm;