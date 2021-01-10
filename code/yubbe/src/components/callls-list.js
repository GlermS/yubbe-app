import React,{useState,useEffect} from 'react'
import axios from 'axios';

async function listCalls(ctx){

    const resp = await axios({
      url:'http://localhost:3000/api/calls',
      method: 'get',
      }).then((response) => {
        return {data: response.data, status: response.status}
  
    }).catch(error =>{
      return {msg:error, status:401}
    })
    
  
    return resp
  }
  

function CallsList(ctx){
    const [calls, setCalls] = useState(0)
    var callsComp = []

    useEffect(async ()=>{
        const resp = await listCalls(ctx)
        setCalls(resp.data.calls)
        })

    if(calls){
        calls.forEach((call,i)=>{
            const date = new Date(call.date)
            callsComp.push(
                <div key={i}>
                    <p>{call.theme}</p>
                    <p><b>Ocupação:</b> {call.clients.length}</p>
                    <p>Data: {date.getDay()}/{date.getMonth()}/{date.getFullYear()} às {date.getHours()}h</p>
                </div>
            )
        })
    }
    return(
        <div>
            {callsComp}
        </div>
    );

}

export default CallsList;
