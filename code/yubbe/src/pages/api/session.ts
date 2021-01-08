import {NextApiRequest, NextApiResponse} from 'next';
import cookie from 'cookie';
import TokenAuthenticator from '../../validation/token-authentication';
import Router from 'next/router'
import axios from 'axios'


export async function verifySession(ctx){
    const cookies = ctx.req?.headers.cookie;
  
    const resp = await axios({
      url:'http://localhost:3000/api/session',
      method: 'get',
      headers:{
        cookie:cookies
      }
      }).then((response) => {
        return {data: response.data, status: response.status}
  
    }).catch(error =>{
      return {msg:error, status:401}
    })
    
     
    if (resp.status ===401 && !ctx.req){
      Router.replace('/login')
      return
    }
    if(resp.status ===401 && ctx.req){
      ctx.res?.writeHead(302,{
        Location:'http://localhost:3000/login'
      });
      ctx.res?.end();
      return
    }
    return resp
}
export default async function Token(req: NextApiRequest,res: NextApiResponse){
    const authenticator = new TokenAuthenticator();
    
    const respo = await authenticator.verifyToken(req)
    
    if (respo.approved){
        res.json(respo)
        
    }else{
        res.status(401)
        res.setHeader('Set-Cookie', cookie.serialize('authToken','',{
            httpOnly:true,
            secure:process.env.NODE_ENV!=='development',
            sameSite:'strict',
            maxAge: 3600,
            path:'/'
        }))
        res.json(respo)
    }
}