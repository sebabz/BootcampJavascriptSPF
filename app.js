// Clase Producto con su constructor 
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Clase Carrito, en donde se almacenan los productos 
class Carrito {
  constructor() {
    this.productos = [];
  }

  //Funcion que agrega los productos al listado
  agregarProducto(producto) {
    this.productos.push(producto);
    this.mostrarDetalles();
  }

  //Funcion que calcula el total 
  calcularTotal() {
    return this.productos
      .reduce((total, prod) => total + prod.precio, 0) // Metodo que reduce todos los valores a uno
      .toLocaleString("es-CL", {                        // funcion que traspasa los valores a pesos chilenos (Buscado en internet)
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
      })
      .replace("$", ""); //para eliminar el  doble simbolo peso
  }

  finalizarCompra() {
    if (this.productos.length === 0) {
      alert("El carrito está vacío");
    } else {
      alert(`Muchas gracias por tu compra. El total es: $${this.calcularTotal()}`);
      this.productos = [];
    }
    this.mostrarDetalles();
  }

  mostrarDetalles() {
    const listaCarrito = document.getElementById("carrito");
    listaCarrito.innerHTML = "";
    this.productos.forEach((producto, index) => {
      const item = document.createElement("li");
      item.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );
      item.innerHTML = `
                ${producto.nombre} - $${producto.precio
        .toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
          minimumFractionDigits: 0,
        })
        .replace("$", "")}
                <button class="btn btn-danger btn-sm" onclick="carrito.eliminarProducto(${index})">Eliminar</button>
            `;
      listaCarrito.appendChild(item);
    });
    document.getElementById("total").innerText = this.calcularTotal();
  }

  eliminarProducto(index) {
    this.productos.splice(index, 1);
    this.mostrarDetalles();
  }
}

// Inicializar carrito
const carrito = new Carrito();

// Lista de productos
const productos = [
  new Producto("Manzanas", 2500),
  new Producto("Pan", 1200),
  new Producto("Leche", 1800),
  new Producto("Arroz", 3000),
  new Producto("Huevos", 2100),
];

// Mostrar productos en la página
function mostrarProductos() {
  const listaProductos = document.getElementById("lista-productos");
  productos.forEach((producto, index) => {
    const item = document.createElement("li");
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    item.innerHTML = `
            ${producto.nombre} - $${producto.precio
      .toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
      })
      .replace("$", "")}
            <button class="btn btn-primary btn-sm" onclick="agregarAlCarrito(${index})">Agregar</button>
        `;
    listaProductos.appendChild(item);
  });
}

// Agregar producto al carrito
function agregarAlCarrito(index) {
  const producto = productos[index];
  if (producto) {
    carrito.agregarProducto(producto);
  } else {
    alert("Producto no válido. Inténtalo de nuevo.");
  }
}

// Aplicar descuento
function aplicarDescuento() {
  const descuento = document.getElementById("descuento").value;
  let total = parseFloat(
    document.getElementById("total").innerText.replace(/\./g, "")
  );

  if (descuento === "DESCUENTO10") {
    total *= 0.9;
    alert("Se ha aplicado un 10% de descuento");
  } else {
    alert("Código de descuento no válido");
  }

  document.getElementById("total").innerText = total
    .toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    })
    .replace("$", "");
}

// Inicializar productos
mostrarProductos();
