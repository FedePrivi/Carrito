const carrito = document.getElementById('container-carrito');
const template = document.getElementById('template');
const fragment = document.createDocumentFragment();
const btns = document.querySelectorAll('.producto .boton')

const carritoArray = [];

const agregarAlCarrito = (e) => { 
    console.log(e.target.dataset.fruta);

    const producto = {
        titulo:e.target.dataset.fruta,
        id:e.target.dataset.fruta,
        cantidad: 1  
    }

    const indice = carritoArray.findIndex( (item) => item.id === producto.id );

     //nos devuelve el indice si es q el item.id (que es el id de cada item del array donde se almacenan los productos) es igual producto.id (que es el producto que se crea pero aun no es almacenado en el array) en resumen para saber si el producto ya fue agregado al array      console.log(indice)

    console.log(indice);

    //si no existe empujamos el nuevo elemento
if (indice === -1) {
    carritoArray.push(producto);
}else {
    carritoArray[indice].cantidad++    
}

// console.log( carritoArray);


    pintarCarrito(/*producto*/)
    
}

console.log(btns);
btns.forEach(boton => {  
    boton.addEventListener("click", agregarAlCarrito) 
    
});

const pintarCarrito = () => {  
    // console.log("pintar carrito", producto);
    carrito.textContent = ''; 

    carritoArray.forEach(item => { /*object.values devuelve un array con los valores de carritoArray y con el forEach lo recorremos y el parametro item hace referencia */
            //console.log(item);
           //console.log(carritoArray);
         const clone = template.content.firstElementChild.cloneNode(true); /*clonamos el template*/
         clone.querySelector('.producto-agregado').textContent = item.titulo;
         clone.querySelector('.cantidad').textContent = item.cantidad;        fragment.appendChild(clone); 
         
          })

    carrito.appendChild(fragment);
}

