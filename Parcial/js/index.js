import Anuncio_Auto from "./Anuncio_Auto.js";
import crearTabla from "./gestionTablas.js";

let listaEntidades = [];
let nextId;
const divTabla = fnGet("divTabla");
export const btnLimpiarTabla = fnGet("btnLimpiarTabla");
export const btnBaja = fnGet("btnBaja");
export const btnModificar = fnGet("btnModificar");
export const btnCancelar = fnGet("btnCancelar");
export const btnGuardar = fnGet("btnGuardar");

let radio20 = fnGet("rdo1");
let radio40 = fnGet("rdo2");
let radio60 = fnGet("rdo3");

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {


    let pruba = fnGet("txtTitulo");
    console.log(pruba.required);

    listaEntidades = obtenerEntidades();
    actualizarLista();
    nextId = obtenerId();

    if(radio20)
    {
        radio20.addEventListener('click', (e) => {
           
            fnGet("numbKMs").value = "20000"
        });
    }
    if(radio40)
    {
        radio40.addEventListener('click', (e) => {
            fnGet("numbKMs").value = "40000"
        });
    }
    if(radio60)
    {
        radio60.addEventListener('click', (e) => {
            fnGet("numbKMs").value = "60000"
        });
    }

    if (btnLimpiarTabla) {
        btnLimpiarTabla.addEventListener('click', (e) => {
            limpiarCampos();
        });
    }
    if (btnBaja) {
        btnBaja.addEventListener('click', (e) => {
            if(confirm("Este anuncio será dado de baja, ¿Desea Continuar?"))
            {
                bajaEntidad();
                actualizarLista();
            }
        });
    }
    if(pruba.required === true)
    {
        if (btnGuardar) {
        btnGuardar.addEventListener('click', (e) => {

            if(confirm("Este anuncio será dado de alta, ¿Desea Continuar?"))
            {
                 AltaEntidad();
             actualizarLista();
            }
           
            
        });
    }
    }
    
    if (btnModificar) {
        btnModificar.addEventListener('click', (e) => {
            if (confirm("Este anuncio será modificado, ¿Desea Continuar?")) {
                modificarEntidad();
                actualizarLista();
            }
        });
    }
    if(btnCancelar){
        btnCancelar.addEventListener('click', (e) => { 
            limpiarControles();
            window.location.reload();
        });
    }
}

function modificarEntidad() {
    let idAnuncio = parseInt(fnGet("txtId").value);
    for (let i = 0; i < listaEntidades.length; i++) {
        if (listaEntidades[i].id === idAnuncio) {
            listaEntidades[i].titulo = fnGet('txtTitulo').value;
            listaEntidades[i].descripcion = fnGet('txtDescripcion').value;
            listaEntidades[i].precio = fnGet('numbPrecio').value;
            if (fnGet('rdoV').checked) {
                listaEntidades[i].transaccion = "venta";
            } else {
                listaEntidades[i].transaccion = "alquiler";
            }
            listaEntidades[i].puertas = fnGet('numbPuertas').value;
            listaEntidades[i].KMS = fnGet('numbKMs').value;
            listaEntidades[i].potencia = fnGet('numbPotencia').value;
            break;
        }
    }

    guardarDatos();
    actualizarLista();
    limpiarCampos();
}

function bajaEntidad() {
    let idAnuncio = parseInt(fnGet("txtId").value);
    for (let i = 0; i < listaEntidades.length; i++) {
        if (listaEntidades[i].id === idAnuncio) {
            listaEntidades.splice(i, 1);
            guardarDatos();
            actualizarLista();
            limpiarCampos();
            break;
        }
    }
}


function AltaEntidad() {
    var id = nextId;
    var txtTitulo = fnGet('txtTitulo').value;
    var txtTranVenta = fnGet('rdoV').checked;
    var transaccion = "venta";
    if (txtTranVenta === false) {
        transaccion = "alquiler";
    }
    //agrego
    var boolKilometros1 = fnGet('rdo1').checked;
    var boolKilometros2 = fnGet('rdo2').checked;
    var kilometros = "20000";
    if (boolKilometros1 === false) {
        if(boolKilometros2 === true)
        {
            kilometros = "40000";
        }else 
        {
             tkilometros = "60000";
        }
       
    }


    var txtDescripcion = fnGet('txtDescripcion').value;
    var txtPrecio = fnGet('numbPrecio').value;
    var txtPuertas = fnGet('numbPuertas').value;
    var txtKMS = fnGet('numbKMs').value;
    var txtPotencia = fnGet('numbPotencia').value;
    let nuevaEntidad = new Anuncio_Auto(id, txtTitulo, transaccion, txtDescripcion, txtPrecio, txtPuertas, kilometros, txtPotencia);
    if (nuevaEntidad) {
        listaEntidades.push(nuevaEntidad);
        nextId++;
        guardarDatos(listaEntidades, nextId);
        actualizarLista();
    }
}

function fnGet(id) {
    return document.getElementById(id);
}

function actualizarLista() {
    if (divTabla) {
        if (localStorage.length !== 0) {
            divTabla.textContent = "";
        }

        divTabla.innerHTML = "";
        let table = crearTabla(listaEntidades);
        divTabla.appendChild(Spinner());

        setTimeout(() => {
            divTabla.innerHTML = "";
            divTabla.appendChild(table);

        }, 3000);
    }
}

function limpiarCampos() {
    fnGet('txtTitulo').value = '';
    fnGet('txtDescripcion').value = '';
    fnGet('numbPrecio').value = '';
    fnGet('rdoV').checked = true;
    fnGet('rdo1').checked = true;
    fnGet('numbPuertas').value = '';
    fnGet('numbKMs').value = '';
    fnGet('numbPotencia').value = '';
}


function Spinner() {
    var spinner = document.createElement('img');
    spinner.setAttribute('src', './images/AUTO.gif');
    spinner.setAttribute('alt', 'spinner');
    spinner.width = 200;
    return spinner;
}

function obtenerEntidades() {
    return JSON.parse(localStorage.getItem('ENTIDAD')) || [];
}

function obtenerId() {
    return JSON.parse(localStorage.getItem('nextId')) || 1;
}

function guardarDatos() {
    localStorage.setItem('ENTIDAD', JSON.stringify(listaEntidades));
    localStorage.setItem('nextId', nextId);
}

function inputRequired()
{
    
}