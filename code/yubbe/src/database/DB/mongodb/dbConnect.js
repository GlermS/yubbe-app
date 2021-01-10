import mongoose from 'mongoose';

const connection ={};

async function dbConnect(){
    if(connection.isConnected){
        return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}).then((connection) => {
        connection.isConnected= connection.connections[0].readyState;
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
        })
}

export default dbConnect;