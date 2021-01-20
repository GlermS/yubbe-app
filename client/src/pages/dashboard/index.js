import React from 'react'
import { withCookies} from 'react-cookie';
import axios from 'axios'
import AdmDashboard from './adm';
import Calls from './calls';


class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            update:0,
            myCalls:[],
            calls:[]
        }
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
    
        if(resp.data){
            this.setState({myCalls:resp.data})
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
        if(resp.data){
            this.setState({calls:resp.data})
        }
      }
    
    updateData =async ()=>{
        await this.listUserCalls(this.props.cookies.cookies);
        await this.listCalls(this.props.cookies.cookies);

    }
    componentDidMount =async ()=>{
        this.updateData()
    }

    switchView = ()=>{
        
        if(this.props.auth==='adm'){
            return(
                <AdmDashboard updateCalls = {this.updateData} mycalls={this.state.myCalls} calls={this.state.calls}/>
            )
        }else{
            return (
                <Calls auth = {this.props.auth} update = {this.updateData} mycalls={this.state.myCalls} calls={this.state.calls}></Calls>
            )
            
        }
    }


    render() {
        return this.switchView()
    }
}

export default withCookies(Dashboard)