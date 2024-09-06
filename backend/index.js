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
  const query = `
    SELECT * FROM person
    WHERE name LIKE ? OR title LIKE ? OR department LIKE ?
  `

  try {
    const result = queryDatabase(query, [
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
    ])
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
