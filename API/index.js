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
    res.set('Access-Control-Allow-Origin', '*')
    res.set("Content-Type", "application/json")
    añadirUsuario(req.body)
})

app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    conexion.query("select * from alumno;", (error, results, fields) =>{
        if(error){
            return console.log("algo salio mal: "+ error)
        }
          res.send(results)  
     })
})

function añadirUsuario(body){
    if(body != undefined){
        let nombre = body.nombre
        let edad = body.edad
        let id_al = body.id_al
        let id_curso = body.id_curso
        //let sqlQ = `INSERT INTO alumno (id_al, nombre, edad, id_curso)`+` VALUES(${id_al}, ${nombre}, ${edad}, ${id_curso})`;
        //let nTostring = nombre.toString()
        //console.log(nTostring)
        let sqlQuery = `INSERT INTO alumno(id_al, nombre, id_curso, edad ) VALUES(${id_al},"${nombre}", ${id_curso}, ${edad})`

        try{
            conexion.query(sqlQuery),(error, results, fields) =>{
                if(error){
                    console.log("algo salio mal: "+ error)
                }
                //res.send(results)
                  
                
             }
        }catch(error){
            console.error("Error "+ error)
        }
       
         
         
    } 
}

app.listen(3001)