import {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

function LoginForm (props){
    const [ email, setEmail] = useState()
    const [password, setPassword] = useState()
    const router = useRouter()

    const handleChangeEmail = (event)=>{
      setEmail( event.target.value)
    }
    const handleChangePassword = (event)=>{
      setPassword(event.target.value)
    }
    const submitForm = async (event)=>{
      event.preventDefault();
      const resp = await axios({
        url:'/api/login',
        method: 'post',
        data: {email, password}
      }).then((response) => {
        if(response.data.approved){
          router.replace('/')
        }

      }).catch((error) => alert(error))  

    }
  
    return(
      <form className ={props.styleclass} >
          <label>
          <span>Email:</span>
          <input type = 'email' name = "email" value = {email} onChange ={handleChangeEmail}></input>
          </label>
          <label>
          <span>Senha:</span>
          <input type = 'password'name = "password" value = {password} onChange ={handleChangePassword}></input>
          </label>
          <button type="submit" onClick={submitForm}>Enviar</button>
      </form>
      );

  }

  export default LoginForm;