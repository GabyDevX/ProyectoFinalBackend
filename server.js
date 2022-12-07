const express = require('express')
const app = express()
const routes = require('./routes/index.js');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes);

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})
