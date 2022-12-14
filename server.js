import express from 'express'
const app = express()
import {routes} from './routes/index.js'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes);

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(` Server running => http://localhost:${PORT}`)
})
