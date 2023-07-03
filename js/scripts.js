class Producto {
    constructor(id, nombre, detalle, imagen, precio) {
        this.id = id;
        this.nombre = nombre;
        this.detalle = detalle;
        this.imagen = imagen;
        this.precio = precio;
    }
}

// defino el arreglo del producto
const productos = JSON.parse(localStorage.getItem('productos')) || []; //me aseguro si es que hay algun arreglo en el localStorage o sino defino el arreglo de productos vacio

const cuerpoTabla = document.getElementById('cuerpoTabla');

const myModal = new bootstrap.Modal(document.getElementById('updateModal'));

//funcion para abrir el modal
const abrirModal = (index) => {
    document.querySelector('.modal-body').innerHTML = '';
    const formularioUpdate = document.createElement('form');

    const contenidoFormulario =
        /* HTML */
        `<div class="mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombreUpdate" value="${productos[index].nombre}"
            >
        </div>
        <div class="mb-3">
            <label class="form-label">Detalle</label>
            <textarea class="form-control" id="detalleUpdate" rows="3">${productos[index].detalle}</textarea>
        </div>
        <div class="d-flex justify-content-between mb-3 row">
            <div class="col-8">
                <label class="form-label">Url de imagen</label>
                <input type="text" class="form-control" id="imagenUpdate"
                value="${productos[index].imagen}">
            </div>
            <div class=" col-4 ">
                <label class="form-label ">Precio</label>
                <input type="number" class="form-control" id="precioUpdate" value="${productos[index].precio}">
            </div>
        </div>
        <div class="text-end ">
            <button class="btn btn-warning" type="button" onclick="actualizarProducto(${index})">editar producto</button>
        </div>`;

    formularioUpdate.innerHTML = contenidoFormulario;
    document.querySelector('.modal-body').append(formularioUpdate);


    myModal.show();
}

const crearProductos = (e) => {
    e.preventDefault(); // evita que se refresque la pagina

    //crear id del producto
    const id = new Date().getTime();

    // traer datos del formulario
    const nombreProd = document.getElementById('nombreProd').value;
    const detalleProd = document.getElementById('detalleProd').value;
    const imgProd = document.getElementById('imgProd').value;
    const precioProd = document.getElementById('precioProd').value;
    //guardar esos datos en el arreglo (productos) y en LocalStorage
    //crear un objeto con los datos
    // const prod = {
    //     id,
    //     nombre: nombreProd,
    //     detalle: detalleProd,
    //     imagen: imgProd,
    //     precio: precioProd
    // };
    // console.log(prod);

    const item = new Producto(id, nombreProd, detalleProd, imgProd, precioProd);


    // const prod = {
    //         nombreProd,
    //         detalleProd,
    //         imgProd,
    //         precioProd
    //     } (funciona igual)


    //agregarlos al arreglo
    productos.push(prod);
    localStorage.setItem('productos', JSON.stringify(productos));
    //limpiar el formulario

    document.getElementById('formulario').reset();
    document.getElementById('nombreProd').focus();

    cargarTabla();

};

const borrarProductos = (index) => {

    let validar = confirm(`esta seguro que quiere borrar ${productos[index].nombre}?`);

    if (validar) {
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        cargarTabla();
    }
};

const actualizarProducto = (index) => {
    productos[index].nombre = document.querySelector('#nombreUpdate').value;
    productos[index].detalle = document.querySelector('#detalleUpdate').value;
    productos[index].imagen = document.querySelector('#imagenUpdate').value;
    productos[index].precio = document.querySelector('#precioUpdate').value;

    localStorage.setItem('productos', JSON.stringify(productos));
    cargarTabla();
    myModal.hide();
}

const cargarTabla = () => {
    //por cada elemneto del arreglo producto crear una fila con las celdas
    cuerpoTabla.innerHTML = '';

    productos.forEach((producto, index) => {
        const fila = document.createElement('tr');
        const celdas = `<tr>
        <th scope="row">${producto.id}</th>
        <td>${producto.nombre}</td>
        <td>${producto.detalle}</td>
        <td>${producto.precio}</td>
        <td><button class="btn btn-danger" onclick="borrarProductos(${index})"><i class="fa-solid fa-trash"></i></button></td>
        <td><button class="btn btn-warning" onclick="abrirModal(${index})"><i class="fa-solid fa-pencil"></i></button></td>
        </tr> `

        fila.innerHTML = celdas

        //agregar la fila en el tbody

        cuerpoTabla.append(fila)
    })

    /*
    <tr>
        <th scope="row">1</th>
        <td>nombre</td>
        <td>detalle</td>
        <td>precio</td>
        </tr> 
    */

    // agregar esa fila en el curpo de la tabla 
};

document.getElementById('formulario').addEventListener('submit', crearProductos) // cuando la funcion esta con parentecis se disapara al instante, cuando no los tiene, se dispara desde el evento

cargarTabla();