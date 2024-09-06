import express from 'express'
import cors from 'cors'
import { queryDatabase } from './database/database.js'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  const search = req.query.search
  if (!search) {
    res.json([])
    return
  }
  const query = `
    SELECT * FROM person
    WHERE name ILIKE $1 OR title ILIKE $1 OR department ILIKE $1
    `
  const result = await queryDatabase(query, [`%${search}%`])
  res.json(result)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
