import { NextApiRequest } from "next";
import MongoDB from "../database/DB/mongodb/mongodb";
import jwt from 'jsonwebtoken'
import { UserInterface } from "../database/interface/database";

class SignupHandler{
    async createAccount(req: NextApiRequest){
        const {name, email, password, authorization} =req.body;
        const isOk = this.validateData(name, email, password, authorization)
        
        if (isOk){
            let db = new MongoDB();
            const resp = await db.createNewAccount(name, email, password, authorization).then((data:UserInterface)=>{
                if (data.approved){
                    return {approved:true, name: data.name , authToken: jwt.sign({name:data.name, id: data.id, authorization: data.authorization},process.env.AUTHENTICATION_KEY, {expiresIn:'1h'})}
                }else{
                    return {approved:false, name: '', authToken: '', message: 'Email já utilizado'}
                     }}
            ).catch((err)=>{
                return {approved:false, name:'', authToken: '', message:err.toString()}})
            return resp 
        }
    }
    validateData(name: string, email: string, password: string, authorization:string):boolean{
        return true;
    }
}
export default SignupHandler;