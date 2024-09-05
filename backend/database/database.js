import pg from 'pg'
import dotenv from 'dotenv'
const { Pool } = pg

dotenv.config()
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

export async function queryDatabase(query, params) {
  const client = await pool.connect()
  try {
    const result = await client.query(query, params)
    return result.rows
  } finally {
    client.release()
  }
}

process.on('SIGINT', () => {
  pool.end()
  process.exit()
})
