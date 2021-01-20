import React from 'react'
import {withCookies} from 'react-cookie'


const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
  
class MyCalls extends React.Component{

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
                console.log(call)
                // const dateParser = Date.parse(call.date)
                const date = new Date(call.date)
                //console.log(date)
                callsComp.push(
                    <div key={"M"+i} className = "call-card" style={{borderColor:'red'}}>
                        <div className = "card-content">
                        <div>
                            <div className="moderator-signal-ball"></div>
                            <p className = "call-theme">Moderator{call.theme}</p>
                            
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
    
    render(){
        return(
        <div className="my-calls">
            <h2>Minhas Calls</h2>
            <div className = "calls-list">
                {this.myCallsRender(this.props.calls)}
            </div>
        </div>
        );
    }
}

export default withCookies(MyCalls);
