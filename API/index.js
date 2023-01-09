const express = require('express')
const app = express()
const mysql = require('mysql')

let bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: false })


let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "ciclos"
})

conexion.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
app.post('/', urlencodedParser, function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:443')
    res.setHeader("Content-Type", 'application/json',)
    let a = req.body
    console.log('welcome, ' + JSON.stringify(a))
  })
/*
app.post('/',urlencodedParser, (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:443')
    console.error()
})
*/
app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:443')
    conexion.query("select * from alumno;", (error, results, fields) =>{
        if(error){
            return console.log("algo salio mal: "+ error)
        }
          res.send(results)
        
     })
})

app.listen(3001)