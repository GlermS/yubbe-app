import {NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest,res: NextApiResponse)=>{
    res.json({message:"café com pão"})
}