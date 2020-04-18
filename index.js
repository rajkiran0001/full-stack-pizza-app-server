require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const mysql = require('mysql')


// Create the server
const app = express()

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(cors());

const SELECT_ALL_USERS = 'select * from users'

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_name
})

connection.connect(err => {
  if(err) {
    return err;
  }
})
console.log(connection);

app.get('/', (req, res) => {
  res.send('go to the home page')
})

app.get('/users', (req, res) => {
  connection.query(SELECT_ALL_USERS, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.json({
        data: results
      })
    }
  })
})

app.get('/users/add', (req, res) => {
  const { uid, firstname, secondname } = req.query;
  const INSERT_USERS = `INSERT INTO users (uid, firstname, secondname) values('${uid}','${firstname}','${secondname}')`;
  connection.query(INSERT_USERS, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.send('successfully added users')
    }
  })
})

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
