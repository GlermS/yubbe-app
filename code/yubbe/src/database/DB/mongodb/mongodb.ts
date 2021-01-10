import UserModel from './models/User'
import CallModel from './models/Call'

import dbConnect from './dbConnect'
import DataBaseInterface,{UserInterface} from '../../interface/database';
import {hash,compare} from 'bcrypt'

class User implements UserInterface{
    approved: boolean;
    name:string;
    id:string;
    authorization:string;

    constructor(approved: boolean,name:string, id:string, authorization:string){
        this.approved=approved
        this.name = name;
        this.id=id;
        this.authorization=authorization;
    }
}

class MongoDB implements DataBaseInterface{
    constructor(){

    }
    async compareLoginData(email: string, password: string){
        dbConnect()
        const resp =await UserModel.find({email: email})
        try{
            const user = await compare(password, resp[0].password).then(isPasswordOk=>{
                if(isPasswordOk){
                    return new User(true, resp[0].name, resp[0].id, resp[0].authorization);
                }else{
                    return new User(false, '', '', '');
                }
            });
            return user;
        }catch(error){
            return new User(false, '', '', '')
        }
    }
    async createNewAccount(name:string, email: string, password: string, authorization: string):Promise<UserInterface>{
        dbConnect()
       
        var user = await hash(password,12).then(async(hash)=>{
            const resp = await UserModel.create({name:name, email: email, password:hash,  authorization:authorization}).then(data=>{
                if(data!=undefined){
                    return new User(true, data.name, data.id, data.authorization)
                    }
                return new User(false, '', '', '')
                }).catch((err)=>{
                return new User(false, '', '', '')
                 })
            return resp
        })
        return user;   
    }
    
    async listCalls(){
        dbConnect()
        const resp = await CallModel.find({}).then((data)=>{return data}).catch((err)=>{return {error: err.toString()}})
        return resp

    }


}

export default MongoDB;