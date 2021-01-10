import {NextApiRequest, NextApiResponse} from 'next';
import CallsHandler from '../../../handlers/calls';

export default async (req: NextApiRequest,res: NextApiResponse)=>{
    const method = req.method
    switch (method){
        case 'GET':
            const handler = new CallsHandler();
            const respo = await handler.listCalls(req);

            res.json(respo);

    }
   
    
    
    

}