const url = 'http://localhost:3000/api/min/'
const contenedor = document.querySelector('tbody')
let resultados = ''
const mostrar = (citas) => {
    citas.forEach(cita => {
        resultados += `<tr>
                            <td>${cita.minimo}</td>                                                
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados   
}

fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))
 
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
 }
