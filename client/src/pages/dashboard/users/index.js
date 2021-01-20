import axios from 'axios';
import React from 'react'
import {CookiesProvider, withCookies} from 'react-cookie'
import SignUpForm from '../../../components/signup-form';
import UserCard from './user-card'


  
class Users extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users:[]
        }
    }

    listUsers = async ()=>{
      const { cookies } = this.props;
      await axios({
        url:process.env.REACT_APP_BACKEND_URI+'/api/adm/users',
        method: 'get',
        headers: {
        "Access-Control-Allow-Origin": "*",
        authToken: cookies.cookies.authToken
      }
      }).then((response) => {
        this.setState({users: response.data})
        
      }).catch((error) => {
        console.log(error)
      })  
    }

    componentDidMount = ()=>{
       this.listUsers()
    }

    usersRender = (users)=>{
        var usersComp = []
        if(users){
            users.forEach((user,i)=>{
                
                usersComp.push(
                    <CookiesProvider>
                        <UserCard name={user.name} id={user._id} email = {user.email} auth ={user.authorization} update={this.listUsers}/>
                    </CookiesProvider>
                    
                )
            })
        
        }
        return usersComp;
    }
    
    render(){
        return(
        <div className="users">
            <div>
                <h2>Cadastrar usuário</h2>
                <SignUpForm></SignUpForm>
            </div>
            <div>
                <h2>Usuários</h2>
                <div className = "users-list">
                    {this.usersRender(this.state.users)}
                </div>
            </div>
        </div>
        );
    }
}

export default withCookies(Users);
