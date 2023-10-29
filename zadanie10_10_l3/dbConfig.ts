import mysql from 'mysql2';
import { Pool } from 'mysql2';


const pool: Pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'baza_do_zad',
    port: 3306
});

export default pool;