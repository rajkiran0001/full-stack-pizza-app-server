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
const SELECT_ALL_PRODUCTS = 'select * from products'
const SELECT_DETAIL_PRODUCT = 'select * from detailProducts'

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_name
})

connection.connect(err => {
  if(err) {
    return err;
  }setInterval(function () {
    connection.query('SELECT 1');
}, 5000);
})
console.log(connection);

app.get('/', (req, res) => {
  res.send('go to the home page')
})


app.get('/products', (req, res) => {
  connection.query(SELECT_ALL_PRODUCTS, (err, results) => {
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

app.get('/detailProduct', (req, res) => {
  connection.query(SELECT_DETAIL_PRODUCT, (err, results) => {
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

app.get('/userDetails/add', (req, res) => {
  const { uid, name, email, phone, address, euro, dollar } = req.query;
  const INSERT_USERS = `INSERT INTO userDetails (uid, name, email, phone, address, euro, dollar) values('${uid}','${name}','${email}','${phone}','${address}','${euro}','${dollar}')`;
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
