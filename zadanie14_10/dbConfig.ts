import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@school.ex8x9zs.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(url);

async function connectToDb(){
    try{
        await client.connect();
        console.log('Połączono z bazą danych');
        return client.db();
    } catch(err){
        console.log(err);
        throw err;
    }
}


export {
    client
}