interface DataBaseInterface{
    compareLoginData(email: string, password: string):Promise<UserInterface>;
    createNewAccount(name:string, email: string, password: string, authorization: string):Promise<UserInterface>;
}

export interface UserInterface{
    approved: boolean;
    name: string;
    id: string;
    authorization: string;
}

export default DataBaseInterface;