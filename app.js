const carrito = document.getElementById('container-carrito');
const footer = document.getElementById('footer');
const templateFooter = document.querySelector('.template-footer')
const template = document.getElementById('template');
const fragment = document.createDocumentFragment();

const modal = document.getElementById('container-modal');
const btnFinalizarCompra = document.querySelector(".terminar-compra");

const precioFinalModal = document.querySelector('.precio-final-total')

let carritoArray = []; //lo cambiamos por un let porq lo vamos a sobrescribir utilizando map en las funciones de aumentar y disminuir carrito


document.addEventListener("click", (e) => {
    //console.log(e.target.matches(".producto .boton"));
    // console.log(e.target.dataset.precio);
    
    if (e.target.matches(".producto .boton")) {
        agregarAlCarrito(e) 
    }

    // console.log(e.target.matches('.boton-mas'));
    if (e.target.matches('.boton-mas')) {
        btnAumentar(e)
    }

    if (e.target.matches('.boton-menos')) {
        btnDisminuir(e)
    }
    if (e.target.matches(".terminar-compra")){
        abrirModal();
    }
    if (e.target.matches('.cancelar')){
        cerrarModal();
    }
    if (e.target.matches('.confirmar')) {
        confirmarModal()
    }
})







const agregarAlCarrito = (e) => { 
    
    // console.log(e.target.dataset.precio);
    const producto = {
        titulo:e.target.dataset.fruta,
        id:e.target.dataset.fruta,
        cantidad: 1,
        precio:parseInt(e.target.dataset.precio)
    };
    // console.log(producto);

    const indice = carritoArray.findIndex( (item) => item.id === producto.id );

     //nos devuelve el indice si es q el item.id (que es el id de cada item del array donde se almacenan los productos) es igual producto.id (que es el producto que se crea pero aun no es almacenado en el array) en resumen para saber si el producto ya fue agregado al array      console.log(indice)

    // console.log(indice);
    

if (indice === -1) {
    //si no existe empujamos el nuevo elemento
    carritoArray.push(producto);
}else {
    //si existe el producto sumamos cantidad y aumentamos el precio segun la cantidad
    carritoArray[indice].cantidad++;
    //carritoArray[indice].precio = carritoArray[indice].cantidad * producto.precio;
} 

// console.log( carritoArray);


pintarCarrito()
    
}

const pintarCarrito = () => {  


    // console.log("pintar carrito", producto);
    carrito.textContent = ''; 

    carritoArray.forEach(item => { /*object.values devuelve un array con los valores de carritoArray y con el forEach lo recorremos y el parametro item hace referencia */
            //console.log(item);
           //console.log(carritoArray);
         const clone = template.content.firstElementChild.cloneNode(true); /*clonamos el template*/
         clone.querySelector('.producto-agregado').textContent = item.titulo;
         clone.querySelector('.cantidad').textContent = item.cantidad;     
         clone.querySelector('.precio-producto span').textContent = item.precio *item.cantidad;   
         fragment.appendChild(clone); 
         clone.querySelector('.boton-mas').dataset.id = item.id;
         clone.querySelector('.boton-menos').dataset.id = item.id

         })

         

    carrito.appendChild(fragment);

    pintarFooter();
}

const pintarFooter = () => {
    //console.log("pintar footer");
    footer.textContent = "";

    const total = carritoArray.reduce(
        (acc, current) => acc + current.cantidad * current.precio, 0
    )
    //console.log(total);


    const clone = templateFooter.content.firstElementChild.cloneNode(true);
    clone.querySelector('.precio-total').textContent = total;
    
    footer.appendChild(clone);


    precioFinal(total)
};


const btnAumentar = (e) =>{
    // console.log("se dio click", e.target.dataset.id );
carritoArray = carritoArray.map(item => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++
        }
        return item;
    });
    pintarCarrito();

}

const btnDisminuir  = (e) =>{
    // console.log("se dio click", e.target.dataset.id );
carritoArray = carritoArray.filter(item => {
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--
                if (item.cantidad === 0) {
                    return 
                }
                return item
            }
        } else {return item}
    });
    pintarCarrito();

    if (carritoArray.length === 0){ 
        footer.textContent = "";
    }//si no existe ningun producto en el array que el footer sea vacio porq sino queda el cartel de precio total con finalizar compra sin ningun producto agregado.
}

const abrirModal = () => {
   modal.showModal();
}

const cerrarModal = () => {
    modal.close();

}

const confirmarModal = () => {
    location.reload()
}


const precioFinal = (tot) => {
    precioFinalModal.textContent = `$ ${tot}`;
    // console.log(tot);
}



