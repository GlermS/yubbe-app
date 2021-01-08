import {NextApiRequest, NextApiResponse} from 'next';
import cookie from 'cookie';
import SignupHandler from '../../handlers/signup';


export default async (req: NextApiRequest,res: NextApiResponse)=>{
    const handler = new SignupHandler();
    
    const respo = await handler.createAccount(req)

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