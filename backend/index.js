import express from 'express'
import cors from 'cors'
import { queryDatabase } from './database/database.js'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api', async (req, res) => {
  const search = req.query.search
  if (!search) {
    res.json([])
    return
  }

  const page = req.query.page || null

  const query = `
    SELECT * FROM person
    WHERE name LIKE ? OR title LIKE ? OR department LIKE ?
    ${page ? 'LIMIT 10 OFFSET ?' : ''}
  `

  try {
    let params = [`%${search}%`, `%${search}%`, `%${search}%`]
    if (page) {
      params.push((page - 1) * 10)
    }
    const result = queryDatabase(query, params)
    res.json(result)
  } catch (error) {
    console.error('Database query error:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while searching the database' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
