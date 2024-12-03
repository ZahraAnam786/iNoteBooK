const ConnectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

ConnectToMongo();

const app = express();
const port = 5000

// Allow requests from 'http://localhost:3000'
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNoteBook Backend app listening on port ${port}`)
})