import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, 'database.sqlite')
export const db = new Database(dbPath)

export function queryDatabase(query, params) {
  const statement = db.prepare(query)
  if (Array.isArray(params)) {
    return statement.all(...params)
  } else if (typeof params === 'object') {
    return statement.all(params)
  } else {
    return statement.all()
  }
}

process.on('SIGINT', () => {
  pool.end()
  process.exit()
})
