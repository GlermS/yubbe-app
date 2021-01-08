import MongoDB from "../database/DB/mongodb/mongodb";
import jwt from 'jsonwebtoken'
import DataBaseInterface from "../database/interface/database";


class LoginAuthentication{
    constructor(){}
    verifyData = async (db: DataBaseInterface, email: string, password: string)=>{
        const data = await db.compareLoginData(email, password)
        return data;
    }
    async authenticate(email:string, password:string){
        let database = new MongoDB();

        const data = await this.verifyData(database, email, password);

        if (data.approved){
            return {approved:true, name:data.name, authToken: jwt.sign({name:data.name, id: data.id, authorization: data.authorization},process.env.AUTHENTICATION_KEY, {expiresIn:'1h'})}
        }else{
            return {approved:false, name:'', authToken: ''}
        }
    }

}

export default LoginAuthentication;