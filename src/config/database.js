import mysql from "mysql2/promise"
import 'dotenv/config'

export async function connection() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT,
        user: process.env.DB_USER, 
        password: process.env.DB_PASSWORD, 
        database: process.env.DB_DATABASE
    })
    return pool
}

export async function closeConnection(pool) {
    if (pool) {
        conn.release();
        await pool.end();
    } else {
        console.log("Conexão já fechada")
    }
}

export async function testConnection() {
    let pool;

    try {
        pool = await connection();
        const conn = await pool.getConnection();
        await conn.ping();

        console.log("✅ Conexão com o MySQL bem-sucedida!");
        conn.release();
    } catch (erro) {
        console.error("❌ Falha ao conectar com o MySQL:", erro.message);
    } finally {
        await closeConnection(pool);
    }
}