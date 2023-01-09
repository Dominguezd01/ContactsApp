const { json } = require('express');
const express = require('express')
const app = express()
const mysql = require('mysql')



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





app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:443')
    conexion.query("select * from alumno;", (error, results, fields) =>{
        if(error){
            return console.log("algo salio mal: "+ error)
        }
          res.send(results)
        
     })
})

app.listen(3001)