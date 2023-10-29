import mysql from 'mysql';
import { Pool } from 'mysql';


const pool: Pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'baza_do_zad',
    port: 3306
});

export default pool;