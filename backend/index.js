const connectToMongoose=require('./db');

connectToMongoose();


const express = require('express')
const app = express()
const port = 5000

var cors = require('cors')

app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})