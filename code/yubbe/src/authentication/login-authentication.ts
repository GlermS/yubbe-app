import MySql from "../database/DB/mysql";
import LoginVerifier from "../database/login-verifier";

class LoginAuthentication{
    constructor(){}
    authenticate(email:string, password:string){
        let database = new MySql();
        let verifier = new LoginVerifier();

        return verifier.verifyData(database, email, password)
        
    }

}

export default LoginAuthentication;