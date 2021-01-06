import DataBaseInterface from "./interface/database";

class LoginVerifier {
    constructor(){
    }

    verifyData = (db: DataBaseInterface, email: string, password: string)=>{
        console.log("Chegou aqui")
        return db.compareLoginData(email, password);
    }
}

export default LoginVerifier;