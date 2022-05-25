const url = 'http://localhost:3000/api/producto/'
const contenedor = document.querySelector('tbody')//
let resultados = ''//
const modalCitas = new bootstrap.Modal(document.getElementById('modalCitas'))//
const formCitas = document.querySelector('form')//
const nom_producto = document.getElementById('nom_producto')
const fh_vencimiento = document.getElementById('fh_vencimiento')
const precio = document.getElementById('precio')
var opcion = ''

btnCrear.addEventListener('click', ()=>{
    nom_producto.value = ''
    fh_vencimiento.value = ''
    precio.value = ''
    modalCitas.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar = (citas) => {
    citas.forEach(cita => {
        resultados += `<tr>
                            <td>${cita.id_producto}</td>
                            <td>${cita.nom_producto}</td>
                            <td>${cita.fh_vencimiento}</td>
                            <td>${cita.precio}</td>
                            <td class="text-center"><a class="btnEditar btn btn-warning">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  
const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.", 
    function  (){
        fetch(url+id, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

//Procedimiento Editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nom_productoForm = fila.children[1].innerHTML
    const fh_vencimientoForm = fila.children[2].innerHTML
    const precioForm = fila.children[3].innerHTML
    nom_producto.value =  nom_productoForm
    fh_vencimiento.value =  fh_vencimientoForm
    precio.value =  precioForm
    opcion = 'editar'
    modalCitas.show()
     
})

//Procedimiento para Crear y Editar
formCitas.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nom_producto:nom_producto.value,
                fh_vencimiento:fh_vencimiento.value,
                precio:precio.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevaCita = []
            nuevaCita.push(data)
            mostrar(nuevaCita)
        })
    }
    if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nom_producto:nom_producto.value,
                fh_vencimiento:fh_vencimiento.value,
                precio:precio.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalCitas.hide()
})