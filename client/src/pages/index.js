import './style.css'
import { withCookies} from 'react-cookie';
import {verifySession} from '../components/session-verifier'
import Dashboard from './dashboard'
import {Redirect} from 'react-router-dom'
import React from 'react'
import logo from "../assets/logo.svg"


class Home extends React.Component{
  constructor(props){
    super(props)
    const { cookies } = props;
    var session = false
    if(cookies.get('authToken')){
      if(cookies.get('authToken')!==''){
        session=true
      }
    }

    this.state = {
      session: session,
      name: cookies.get('name') ||'',
      auth: 'client'
    }
  }
  
  logoutFunc = async ()=>{
    
    const { cookies } = this.props;
    //console.log(cookies.get('authToken'))
    cookies.set('authToken','',{path:'/'})
    this.setState({session:false})

    //router.replace('/login')
  }

  componentDidMount = async()=>{
    const { cookies } = this.props;

    const respo = await verifySession(cookies.cookies);
    console.log(respo)
    if(respo.data){
    if(respo.data.approved){
      if(!this.state.session){
        this.setState({session: true})
      }
      //cookies.set('authToken','',{path:'/'})
      if(respo.data.name){
        this.setState({name:respo.data.name})
      }
      if(respo.data.authorization){
        console.log('Updating')
        this.setState({auth:respo.data.authorization})
      }
    }else{
      if(this.state.session){
        this.setState({session: false})
      }
    }
  }else{
    if(this.state.session){
      this.setState({session: false})
    }
  }
}

  redirect = ()=>{
    if(this.state.session){
      return []
    }else{
      return <Redirect to="/login"/>
    }
  }

  render(){
    console.log(this.state)
  return (
    
    <div className="container">
      {this.redirect()}
      <main className="main">
        <header className="header"><h1>Welcome, {this.state.name}!</h1>  <button onClick={this.logoutFunc} className="logoutbutton">Logout</button></header>
        <Dashboard auth = {this.state.auth} username ={this.state.name}/>
      </main>

      <footer className="footer">
        <p>
          Powered by: 
        </p>
        <img src={logo} alt="Yubbe Logo" className="logo" />
      </footer>
    </div>
  )
  }
}



export default withCookies(Home);
  
/*
Home.getInitialProps = async (ctx)=>{
  const resp  =await verifySession(ctx);
  return resp
}*/
