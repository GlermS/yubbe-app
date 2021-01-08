import {NextApiResponse, NextApiRequest} from 'next'
import cookie from 'cookie'

export default (req: NextApiRequest, res: NextApiResponse)=>{
    //console.log(res)
    res.setHeader('Set-Cookie', cookie.serialize('authToken','',{
        httpOnly:true,
        secure:process.env.NODE_ENV!=='development',
        sameSite:'strict',
        maxAge: 3600,
        path:'/'
    }))
    res.redirect('/')
}