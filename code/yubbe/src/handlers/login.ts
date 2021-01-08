import { NextApiRequest } from "next";
import LoginAuthentication from "../validation/login-authentication";

class LoginHandler{
    authenticateData(req: NextApiRequest){
        const {email, password} =req.body;
        const authenticator = new LoginAuthentication();
        return authenticator.authenticate(email, password)
    }   
}
export default LoginHandler;