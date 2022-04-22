const carrito = document.getElementById('container-carrito');
const template = document.getElementById('template');
const fragment = document.createDocumentFragment();
const btns = document.querySelectorAll('.producto .boton')

const carritoObjeto = {} /*aca se almacenan los productos que ageguemos*/

const agregarAlCarrito = (e) => { /*funcion para agregar al carrito los objetos*/
    // console.log(e.target.dataset.fruta);
    const producto = {
        titulo:e.target.dataset.fruta,
        id:e.target.dataset.fruta,
        cantidad: 1 /*cantidad de productos q aparecen al agregar masd e un producto*/ 
    }

    if (carritoObjeto.hasOwnProperty(producto.titulo)) {
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1  
    }

     /*empujamos el producto q agreguemos desde el evento al objeto carritoObjeto*/

    // console.log(carritoObjeto);
    carritoObjeto[producto.titulo] = producto;
    pintarCarrito(/*producto*/)
    
}
                    /*el parametro producto no es necesario solo era para mostrarloe n consola*/
const pintarCarrito = (/*producto*/) => { /*funcion para agregar los productos en el template*/ 
    // console.log("pintar carrito", producto);

    carrito.textContent = ''; /*para que no se agregun linea por cada elemento que demos click*/


    Object.values(carritoObjeto).forEach(item => { /*object.values devuelve un array con los valores de carritoObjeto y con el forEach lo recorremos y el parametro item hace referencia */
            //console.log(item);
            console.log(carritoObjeto);
         const clone = template.content.firstElementChild.cloneNode(true); /*clonamos el template*/
         clone.querySelector('.producto-agregado').textContent = item.titulo;
         clone.querySelector('.cantidad').textContent = item.cantidad; /*viene de prodcuto del dataset que es el data-fruta" ..." del html*/
         
         fragment.appendChild(clone); /*para evitar el reflow*/
    })

    carrito.appendChild(fragment);
}
btns.forEach(boton => {  /*para recorrer los botones*/
    boton.addEventListener("click", agregarAlCarrito) /*a cada boton le agrego una escucha de evento*/
});
