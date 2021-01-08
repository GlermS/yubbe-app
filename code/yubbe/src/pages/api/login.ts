import {NextApiRequest, NextApiResponse} from 'next';
import LoginHandler from '../../handlers/login';
import cookie from 'cookie';


export default async (req: NextApiRequest,res: NextApiResponse)=>{
   
    const handler = new LoginHandler();
    
    const respo = await handler.authenticateData(req)

    res.setHeader('Set-Cookie', cookie.serialize('authToken',respo.authToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV!=='development',
        sameSite:'strict',
        maxAge: 3600,
        path:'/'
    }))
    const response ={
        approved:respo.approved,
        name: respo.name
    }
    res.json(response)

}