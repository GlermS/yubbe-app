import React from 'react'
import axios from 'axios'
import {withCookies} from 'react-cookie'

class UserCard extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            name: props.name,
            id: props.id,
            email: props.email,
            authorization: props.auth
        }
    }

    updateUser = async ()=>{
        const { cookies } = this.props;
        await axios({
          url:process.env.REACT_APP_BACKEND_URI+'/api/adm/user',
          method: 'put',
          data: {userData: this.state},
          headers: {
          "Access-Control-Allow-Origin": "*",
          authToken: cookies.cookies.authToken
        }
        }).then((response) => {
          console.log(response.data)
          
        }).catch((error) => {
          console.log(error)
        })  
      }

    submitChanges =async()=>{
        await this.updateUser()
        await this.props.update()
    }


    render(){
        return (
        <div className = "user-card">
            <div className = "user-card-content">
                <form>
                    <input type="text" className = "user-name" value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}}/>
                    <input type="text" className = "user-email" value={this.state.email} onChange={(e)=>{this.setState({email: e.target.value})}}/>
                    <select value={this.state.authorization} onChange={(e)=>{this.setState({authorization: e.target.value})}}>
                        <option value="client">Cliente</option>
                        <option value = "moderator">Moderador</option>
                        <option value = 'adm'>Adm</option>
                        <option value = 'abacate'>abacate</option>
                    </select>
                    <button type="submit" className ='submit-changes' onClick = {this.submitChanges}>Enviar mudança</button>
                    <button className="delete-user"> Excluir usuário</button>
                </form>
            </div>
        </div>)}
}

export default withCookies(UserCard)