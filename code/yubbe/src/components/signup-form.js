import {useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'

function SignUpForm (props){
    const [ email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [authorization, setAuth] = useState()
    const router = useRouter()

    const submitForm = async (event)=>{
      event.preventDefault();
      
      const resp = await axios({
        url:'/api/signup',
        method: 'post',
        data: {name, email, password, authorization}
      }).then((response) => {
        router.replace('/login')
      }).catch((error) => alert(error))  

    }
  
    return(
      <form className ={props.styleclass} >
          <label>
          <span>Nome:</span>
          <input type = 'text' name = "name" value = {name} onChange ={(e)=>{setName(e.target.value)}}></input>
          </label>
          <label>
          <span>Email:</span>
          <input type = 'email' name = "email" value = {email} onChange ={(e)=>{setEmail(e.target.value)}}></input>
          </label>
          <label>
          <span>Senha:</span>
          <input type = 'password'name = "password" value = {password} onChange ={(e)=>{setPassword(e.target.value)}}></input>
          </label>
          <label>
          <span>Tipo:</span>
          <input type = 'text' name = "authorization" value = {authorization} onChange ={(e)=>{setAuth(e.target.value)}}></input>
          </label>
          <button type="submit" onClick={submitForm}>Enviar</button>
      </form>
      );

  }

  export default SignUpForm;