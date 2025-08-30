const connectToMongo=require('./db')
const express = require('express')
const cors = require('cors')
connectToMongo()

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))
app.get('/health', (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: Date.now() });
});

app.listen(port, () => {
  console.log(`inotebook app listening on port ${port}`)
})