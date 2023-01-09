onload = ()=>{
    fetchApi()
}


const fetchApi = () =>{
    const options = {
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:443'
        }
        
    }
    
    fetch("http://127.0.0.1:3001")
        .then(response => response.json())
        .then(response => crearAlumnos(response))
    
}


const crearAlumnos = (response) =>{
    let previousResponse = response

    if(previousResponse != response){
        console.log("Distinto")
    }



    for(let i = 0; i<=response.length;i++){
        let divAlumno = document.createElement("div")
        divAlumno.setAttribute("id", "divAlumno")

        let spanNombre = document.createElement("span")
        let spanEdad = document.createElement("span")
        let spanIdAl = document.createElement("span")
        let spanIdCur = document.createElement("span")
        
        spanNombre.innerText = "Nombre: " +response[i].nombre
        spanEdad.innerText = "Edad: " + response[i].edad
        spanIdAl.innerText = "Id Alumno: "+ response[i].id_al
        spanIdCur.innerText = "Id Curso: " + response[i].id_curso

        divAlumno.appendChild(spanNombre)
        divAlumno.appendChild(spanEdad)
        divAlumno.appendChild(spanIdAl)
        divAlumno.appendChild(spanIdCur)

        document.getElementById("alumnosContainer").appendChild(divAlumno)
    }
    

} 