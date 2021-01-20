import React from 'react';
import CallsList from './callls-list'
import MyCalls from './my-calls';
import { CookiesProvider } from 'react-cookie';



export default class Calls extends React.Component{
    render() {
      return(
        <div className ='calls'>
            <CookiesProvider>
                <MyCalls auth ={this.props.auth} update = {this.props.update} calls={this.props.mycalls}/>
                <CallsList auth ={this.props.auth} update = {this.props.update} calls={this.props.calls}></CallsList> 
            </CookiesProvider>
        </div>
     )     
    }            
}