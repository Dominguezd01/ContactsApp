onload = () => {
    fetchApi()
    setInterval(fetchApi, 1000)

    document.querySelector("#form").addEventListener("submit", e => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        console.log(data["nombre"])
        fetch("http://127.0.0.1:3001/", {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-Type": "application/json",
            },
            method: "POST",
            body:JSON.stringify( {
                nombre: `${data["nombre"]}`,
                edad: `${data["edad"]}`,
                id_al: `${data["idAl"]}`,
                id_curso: `${data["idCurso"]}` 
            })
        })
    })
}



function crearAlumnos (response){
    let alumnosContainer = document.getElementById("alumnosContainer")
    alumnosContainer.innerHTML = ""



    for (let i = 0; i < response.length; i++) {
        let divAlumno = document.createElement("div")
        divAlumno.setAttribute("id", "divAlumno")

        let spanNombre = document.createElement("span")
        let spanEdad = document.createElement("span")
        let spanIdAl = document.createElement("span")
        let spanIdCur = document.createElement("span")

        spanNombre.innerText = "Nombre: " + response[i].nombre
        spanEdad.innerText = "Edad: " + response[i].edad
        spanIdAl.innerText = "Id Alumno: " + response[i].id_al
        spanIdAl.setAttribute("id", "idAl")
  
        
        spanIdCur.innerText = "Id Curso: " + response[i].id_curso

        divAlumno.appendChild(spanNombre)
        divAlumno.appendChild(spanEdad)
        divAlumno.appendChild(spanIdAl)
        divAlumno.appendChild(spanIdCur)
        
        let botonBorrar = document.createElement("button")
        botonBorrar.setAttribute("id", "botonBorrar")
       
        botonBorrar.addEventListener("click", e=>{
            let divcerca = e.target.closest("div")
            //console.log(e.target.closest("div"))
          
            let usuario = Number(divcerca.querySelector("span#idAl").innerText.split(":")[1])
            
            fetchDelete(usuario)
        })
       
        botonBorrar.innerText ="X"
        divAlumno.insertAdjacentElement("beforeend",botonBorrar)
        document.getElementById("alumnosContainer").appendChild(divAlumno)
    }




} 
function fetchDelete(idAl){
    fetch("http://127.0.0.1:3001/delete", {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-Type": "application/json",
            },
            method: "POST",
            body:JSON.stringify( {
                id_al: `${idAl}`,
            })
        })
}

function fetchApi (){
    fetch("http://127.0.0.1:3001", {
        method: "get"
    })
        .then(response => response.json())
        .then(response => crearAlumnos(response))

}


