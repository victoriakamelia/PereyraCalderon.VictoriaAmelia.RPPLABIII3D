import { btnBaja, btnGuardar, btnModificar } from "./index.js";


function crearTabla(lista) {
    const tabla = document.createElement('table');
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));
    return tabla;
}

function crearCabecera(item) {
    const tHead = document.createElement('thead');
    const tr = document.createElement('tr');
    for (const key in item) {
        const th = document.createElement('th');
        const texto = document.createTextNode(key);
        th.appendChild(texto);
        tHead.appendChild(th);
    }
    return tHead;
}

function crearCuerpo(lista) {
    const tBody = document.createElement('tbody');
    lista.forEach(element => {
        const tr = document.createElement('tr');
        for (const key in element) {
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);
        }
        if (element.hasOwnProperty('id')) {
            tr.dataset.id = element['id'];

        }
        agregarManejadorTR(tr, lista);

        tBody.appendChild(tr);

    });

    return tBody;
}

function agregarManejadorTR(tr, lista) {
    let idAnuncio;

    if (tr) {

        tr.addEventListener('click', (e) => {
            e.preventDefault();
            idAnuncio = parseInt(e.path[1].dataset.id);
            cargarDatosForm(lista, idAnuncio);

        });
    }
}


function cargarDatosForm(lista, id) {

    for (const entidad of lista) {

        if (entidad.id === id) {
            document.getElementById('txtId').value = entidad.id;
            document.getElementById('txtTitulo').value = entidad.titulo;
            document.getElementById('txtDescripcion').value = entidad.descripcion;
            document.getElementById('numbPrecio').value = entidad.precio;
            if (entidad.transaccion === "alquiler") {
                document.getElementById('rdoV').checked = true;
            } else {
                document.getElementById('rdoA').checked = true;
            }
            document.getElementById('numbPuertas').value = entidad.puertas;
            

            if(entidad.KMS === "20000")
            {
                document.getElementById('numbKMs').value = entidad.KMS;
                document.getElementById('rdo1').checked =true;

            }else if(entidad.KMS === "40000")
            {
                document.getElementById('numbKMs').value = entidad.KMS;
                document.getElementById('rdo2').checked =true;

            }else
            {
                document.getElementById('numbKMs').value = entidad.KMS;
                document.getElementById('rdo3').checked =true;

            }



            document.getElementById('numbPotencia').value = entidad.potencia;
            btnBaja.classList.remove('deshabilitar');
            btnModificar.classList.remove('deshabilitar');
            btnGuardar.classList.add('deshabilitar');
            break;
        }
    }
};


export default crearTabla;
