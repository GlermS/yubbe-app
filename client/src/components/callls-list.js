import React from 'react'
import axios from 'axios';
import {withCookies} from 'react-cookie'


const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  
class CallsList extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            calls:[],
            myCalls:[]
        }
    }

    listCalls = async (cookies)=>{

        const resp = await axios({
          url:process.env.REACT_APP_BACKEND_URI+'/api/calls',
          method: 'get',
          headers: {"Access-Control-Allow-Origin": "*", "authToken":cookies.authToken}
          }).then((response) => {
            //console.log(response);
            
            return {data: response.data, status: response.status}
      
        }).catch(error =>{
          return {msg:error, status:401}
        })
        //console.log(resp)
        return resp
      }

      listUserCalls = async (cookies)=>{

        const resp = await axios({
          url:process.env.REACT_APP_BACKEND_URI+'/api/calls/mycalls',
          method: 'get',
          headers: {"Access-Control-Allow-Origin": "*", "authToken":cookies.authToken}
          }).then((response) => {
            //console.log(response);
            
            return {data: response.data, status: response.status}
      
        }).catch(error =>{
          return {msg:error, status:401}
        })
        //console.log(resp)
        return resp
      } 

    componentDidMount = async ()=>{
        const { cookies } = this.props;

        const mycalls = await this.listUserCalls(cookies.cookies)
        const calls = await this.listCalls(cookies.cookies)
        if(calls.data){
            this.setState({calls:calls.data})
        }
        if(mycalls.data){
            this.setState({myCalls:mycalls.data})
        }
       }

    joinCall = async (event) =>{
        //console.log(event)
        await axios({
            url:process.env.REACT_APP_BACKEND_URI+'/api/call/join',
            method: 'post',
            headers: {"Access-Control-Allow-Origin": "*", "authToken":this.props.cookies.cookies.authToken},
            data:{
                callId: event.target.id
            }
            }).then((response) => {
              return {data: response.data, status: response.status}
        
          }).catch(error =>{
            if (error.response.status ===429){
                alert("Você atingiu o seu limite semanal.")
            }else if(error.response.status ===429){
                alert("Desculpa, mas a Call já está lotada.")
            }
            return {msg:error}
          })
        
        const { cookies } = this.props;
        const mycalls = await this.listUserCalls(cookies.cookies)
        const calls = await this.listCalls(cookies.cookies)
        if(calls.data){
            this.setState({calls:calls.data})
        }
        if(mycalls.data){
            this.setState({myCalls:mycalls.data})
        }
    }
    moderateCall = async (event) =>{
        //console.log(event)
        await axios({
            url:process.env.REACT_APP_BACKEND_URI+'/api/call/moderate',
            method: 'post',
            headers: {"Access-Control-Allow-Origin": "*", "authToken":this.props.cookies.cookies.authToken},
            data:{
                callId: event.target.id
            }
            }).then((response) => {
              return {data: response.data, status: response.status}
        
          }).catch(error =>{
            return {msg:error}
          })
        
        const { cookies } = this.props;
        
        const mycalls = await this.listUserCalls(cookies.cookies)
        const calls = await this.listCalls(cookies.cookies)
        if(calls.data){
            this.setState({calls:calls.data})
        }
        if(mycalls.data){
            this.setState({myCalls:mycalls.data})
        }
    }
    specialAuthStyle = ()=>{
        if(this.props.auth==="adm" || this.props.auth==="moderator"){
            return {display: "flex"}
        }else{
            return {display: "none" }
        }
    }
    myCallsRender = (calls)=>{
        var callsComp = []
        if(calls.client){
            calls.client.forEach((call,i)=>{
                var moderator = []
                //console.log(call)
                // const dateParser = Date.parse(call.date)
                const date = new Date(call.date)
                //console.log(date)
                callsComp.push(
                    <div key={i} className = "call-card">
                        <div className = "card-content">
                        <div>
                            <p className = "call-theme">{call.theme}</p>
                            {moderator}
                            <p className = "call-occupation"><b>Ocupação:</b> {call.clients.length}</p>
                            <p className = "call-date">Data: {date.getDate()} {meses[date.getMonth()]} {date.getFullYear()} às {date.getHours()}h</p>
                        </div>
                        
                        </div>
                    </div>
                )
            })
        
        }
        if(calls.moderator){
            calls.moderator.forEach((call,i)=>{
                //console.log(call)
                // const dateParser = Date.parse(call.date)
                const date = new Date(call.date)
                //console.log(date)
                callsComp.push(
                    <div key={"M"+i} className = "call-card" style={{borderColor:'red'}}>
                        <div className = "card-content">
                        <div>
                            <div className="moderator-signal-ball"></div>
                            <p className = "call-theme">{call.theme}</p>
                            
                            <p className = "call-occupation"><b>Ocupação:</b> {call.clients.length}</p>
                            <p className = "call-date">Data: {date.getDate()} {meses[date.getMonth()]} {date.getFullYear()} às {date.getHours()}h</p>
                        </div>
                       </div> 
                        
                    </div>
                )
            })
        }
        return callsComp
    }
    availableCallsRender = (calls)=>{
        var callsComp = []
        if(calls){
            calls.forEach((call,i)=>{
                var moderator = []
                if(call.moderator[0]){
                    moderator = <p className = "call-occupation"><b>Moderador:</b> {call.moderator[0].name}</p>
                }
    
                //console.log(call)
                // const dateParser = Date.parse(call.date)
                const date = new Date(call.date)
                //console.log(date)
                callsComp.push(
                    <div key={i} className = "call-card">
                        <div className = "card-content">
                        <div className="card-description">
                            <p className = "call-theme">{call.theme}</p>
                            {moderator}
                            <p className = "call-occupation"><b>Ocupação:</b> {call.clients.length}</p>
                            <p className = "call-date">Data: {date.getDate()} {meses[date.getMonth()]} {date.getFullYear()} às {date.getHours()}h</p>
                        </div>
                        <div className="card-buttons">
                            <button className= "moderate" id={call._id} onClick= {this.moderateCall} style ={this.specialAuthStyle()}>Moderate</button>
                            <button className= "join-call" id={call._id} onClick= {this.joinCall}>Join call</button>
                        </div>
                        </div>
                    </div>
                )
            })
        }
        
        return callsComp
    }
    
    render(){
        return(
        <div className="calls">
            <h2>Minhas Calls</h2>
            <div className = "calls-list">
                {this.myCallsRender(this.state.myCalls)}
            </div>
            <h2>Calls disponíveis</h2>
            <div className = "calls-list">
                {this.availableCallsRender(this.state.calls)}
            </div>
        </div>
        );
    }
}

export default withCookies(CallsList);
