const express = require('express')
const app = express()
const mysql = require('mysql')
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

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


app.post('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Content-Type", "application/json")
    mostrarBody(req.body)
})

app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:443')
    conexion.query("select * from alumno;", (error, results, fields) =>{
        if(error){
            return console.log("algo salio mal: "+ error)
        }
          res.send(results)
          
        
     })
})
function mostrarBody(body){
    if(body != undefined){
        console.log(body)
    } 
}
app.listen(3001)