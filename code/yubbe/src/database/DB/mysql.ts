import DataBaseInterface from '../interface/database';

class MySql implements DataBaseInterface{
    host:string;
    user: string;
    password:string;
    name:string;
    connection: string;

    constructor(){
        this.host = "127.0.0.1:3306"
        this.user = "TesteSite"
        this.password = "Longlife4us"
        this.name = "dbname"

        this.connection = "mysql.createConnection({host: this.host, user: this.user, password: this.password, database: this.name})"
    }
    compareLoginData = (email: string, password: string)=>{
       /* this.connection.query(
            'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
            function(err, results, fields) {
              console.log(results); // results contains rows returned by server
              console.log(fields); // fields contains extra meta data about results, if available
            }
            );*/
        return true;
    }
}

export default MySql