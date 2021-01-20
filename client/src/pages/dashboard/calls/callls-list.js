import React from 'react'
import axios from 'axios';
import {withCookies} from 'react-cookie'


const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  
class CallsList extends React.Component{

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

        await this.props.update()
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
        
        
        await this.props.update();
    }

    specialAuthStyle = ()=>{
        if(this.props.auth==="adm" || this.props.auth==="moderator"){
            return {display: "flex"}
        }else{
            return {display: "none" }
        }
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
        <div className ="availabel-calls">
            <h2>Calls disponíveis</h2>
            <div className = "calls-list">
                {this.availableCallsRender(this.props.calls)}
            </div>
        </div>
        );
    }
}

export default withCookies(CallsList);
