onload = ()=>{
    fetchApi()
    setInterval(fetchApi, 500)

    document.querySelector("#form").addEventListener("submit", e =>{
        e.preventDefault()
        
        const data = Object.fromEntries(new FormData(e.target))
        const contacto ={
            nombre: data.nombre,
            edad: data.edad,
            idAl: data.idAl,
            idCurso: data.idCurso,
        }
        
        
        fetchEnviar(contacto)
        console.log(contacto)
        
        function fetchEnviar (data) {
            fetch(`http://127.0.0.1:3001`,{
                headers: new Headers({
                    'Access-Control-Allow-Origin': "http://127.0.0.1:443",
                    "Content-Type": 'application/json'}),
                
                method: "POST",
                body: {data}
            }) 
        }
    })
}


const fetchApi = () =>{
    fetch("http://127.0.0.1:3001",{
        method: "get"
    })
        .then(response => response.json())
        .then(response => crearAlumnos(response))
    
}


const crearAlumnos = (response) =>{
    let alumnosContainer = document.getElementById("alumnosContainer")
    alumnosContainer.innerHTML = ""



    for(let i = 0; i<response.length;i++){
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