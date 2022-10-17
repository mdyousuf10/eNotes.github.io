const express = require('express')
const connectToMongo = require('./db');
const cookieParser = require("cookie-parser");
var cors = require('cors')


connectToMongo();

const app = express()
const port = 5000


app.use(cors())
app.use(express.json());
// This middleware will not allow the
// request to go beyond it
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



//function to show port location 
app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})
app.use(cookieParser());  