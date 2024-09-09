import express from 'express'
import { query, validationResult } from 'express-validator'
import cors from 'cors'
import { queryDatabase } from './database/database.js'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get(
  '/api/search',
  [
    query('query').optional().trim().escape(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    query('offset').optional().isInt({ min: 0 }).toInt(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { query: search, limit = -1, offset = 0 } = req.query

    let sqlQuery = `SELECT * FROM person`
    let params = []

    if (search) {
      sqlQuery += ` WHERE name LIKE ? OR title LIKE ? OR department LIKE ? OR email LIKE ? OR phone LIKE ? OR location LIKE ?`
      params.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      )
    }

    sqlQuery += ' LIMIT ? OFFSET ?'
    params.push(limit, offset)

    try {
      const result = queryDatabase(sqlQuery, params)
      res.json(result)
    } catch (error) {
      console.error('Database query error:', error)
      res
        .status(500)
        .json({ error: 'An error occurred while searching the database' })
    }
  }
)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
