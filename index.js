require("dotenv").config();
var express = require("express");
var mysql = require("mysql");
const cors = require("cors");
var app = express();

app.use(cors());

var connection = mysql.createPool({
  connectionLimit: 50,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_name,
});

app.get("/products", function (req, res) {
  connection.getConnection(function (error, tempCont) {
    if (!!error) {
      tempCont.release();
      console.log("Error");
    } else {
      tempCont.query("select * from products", function (error, rows, fields) {
        tempCont.release();
        if (!!error) {
          console.log("Error in the products query");
        } else {
          return res.json({
            data: rows,
          });
        }
      });
    }
  });
});

app.get("/detailProduct", function (req, res) {
  connection.getConnection(function (error, tempCont) {
    if (!!error) {
      tempCont.release();
      console.log("Error");
    } else {
      tempCont.query("select * from detailProducts", function (
        error,
        rows,
        fields
      ) {
        tempCont.release();
        if (!!error) {
          console.log("Error in the detailProducts query");
        } else {
          return res.json({
            data: rows,
          });
        }
      });
    }
  });
});

app.get("/userDetails", function (req, res) {
  connection.getConnection(function (error, tempCont) {
    if (!!error) {
      tempCont.release();
      console.log("Error");
    } else {
      tempCont.query("select * from userDetails", function (
        error,
        rows,
        fields
      ) {
        tempCont.release();
        if (!!error) {
          console.log("Error in the userDetails query");
        } else {
          return res.json({
            data: rows,
          });
        }
      });
    }
  });
});

app.get("/userDetails/add", function (req, res) {
  const { uid, name, address, euro, dollar } = req.query;
  connection.getConnection(function (error, tempCont) {
    if (!!error) {
      tempCont.release();
      console.log("Error");
    } else {
      tempCont.query(
        `INSERT INTO userDetails (uid, name, address, euro, dollar) values('${uid}','${name}','${address}','${euro}','${dollar}')`,
        function (error, rows, fields) {
          tempCont.release();
          if (!!error) {
            console.log("Error in the userDetails/add query");
          } else {
            return res.json({
              data: rows,
            });
          }
        }
      );
    }
  });
});

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});
