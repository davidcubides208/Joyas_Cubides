const productos = [
  {
    id: 1,
    nombre: "Reloj de oro ",
    descripcion:"Reloj re oro 24 Kilates",
    precio: 25000000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6KcHeqYwXhYi5mwmy6-xGy-kkjux-o5djbdh4s3wXww&s=10"
  },
  {
    id: 2,
    nombre: "Anillo de diamantes",
    descripcion:"Anillo de diamantes de la edad media" ,
    precio: 18000000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDWabST6sanxcr-K_IJAzK4FtdcLKLCeAaTfEgZMv69A&s=10"
  },
  {
    id: 3,
    nombre: "Rolex rosa",
    descripcion: "Reloj de oro rosa",
    precio: 34900000,
    imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToYFSXOSE45Uj_-3GeV5sBgxPh-2SBDUgWbNgiskYiqg&s=10"
  },
  {
    id: 4,
    nombre: "Anillo Pandora",
    descripcion: "Anillo con esmeraldas",
    precio: 5700000,
    imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKUEfnwGj2f_X4RmHxCG9cqIkpRtbygQq58m6ubkHjXA&s=10"
  },
  {
    id: 5,
    nombre: "Anillo de Matrimonio Venezia",
    descripcion: " Anillo de oro 18 K para matrimonio",
    precio: 30000000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQYD3d89tmCs-9zGeX-EVdTN1F5gznm3RKmNnIgDwGKA&s=10"
  }
];


/* ==============================
   CARRITO
================================ */

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");


/* ==============================
   MOSTRAR PRODUCTOS
================================ */

function mostrarProductos() {

  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.className = "producto";

    div.innerHTML = `
      <div class="foto">
        <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy"
             onerror="this.style.display='none'">
      </div>

      <h3>${prod.nombre}</h3>

      <p class="descripcion">
        ${prod.descripcion}
      </p>

      <p class="precio">
        ${prod.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0
        })}
      </p>

      <button onclick="agregarAlCarrito(${prod.id})">
        Agregar al carrito
      </button>
    `;

    contenedorProductos.appendChild(div);

  });

}


/* ==============================
   AGREGAR AL CARRITO
================================ */

function agregarAlCarrito(id) {

  const productoExistente =
    carrito.find(p => p.id === id);

  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    const producto =
      productos.find(p => p.id === id);

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  actualizarCarrito();

}


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

  listaCarrito.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {

    const li =
      document.createElement("li");

    const subtotal =
      item.precio * item.cantidad;

    const nombre =
      document.createElement("span");

    nombre.className = "item-nombre";

    nombre.textContent =
      `${item.nombre.trim()} × ${item.cantidad}`;

    const precio =
      document.createElement("span");

    precio.className = "item-precio";

    precio.textContent =
      subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      });

    li.appendChild(nombre);
    li.appendChild(precio);

    listaCarrito.appendChild(li);

    total += subtotal;
    totalItems += item.cantidad;

  });

  totalCarrito.textContent =
    total.toLocaleString("es-CO");

  actualizarTituloCarrito(totalItems);

}


/* ==============================
   CONTADOR DEL CARRITO
================================ */

function actualizarTituloCarrito(cantidad) {

  const titulo =
    document.querySelector(".carrito h2");

  titulo.textContent =
    `Carrito de Compras (${cantidad})`;

  // Contador del header (con una pequeña animación)
  const contador =
    document.getElementById("contador-header");

  contador.textContent = cantidad;

  contador.classList.remove("bump");
  void contador.offsetWidth;
  contador.classList.add("bump");

}


/* ==============================
   VACIAR CARRITO
================================ */

function vaciarCarrito() {

  if (carrito.length === 0) {

    alert("🛒 El carrito ya está vacío.");

    return;

  }

  if (
    confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    )
  ) {

    carrito.length = 0;

    actualizarCarrito();

  }

}


/* ==============================
   FINALIZAR COMPRA
================================ */

function finalizarCompra() {

  if (carrito.length === 0) {

    alert(
      "🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra."
    );

    return;

  }

  alert(
    "🎉 ¡Pedido simulado confirmado!\n\n" +
    "En un eCommerce real, ahora entrarían en acción " +
    "el backend, la pasarela de pago y la logística."
  );

  carrito.length = 0;

  actualizarCarrito();

}


/* ==============================
   INICIAR TIENDA
================================ */

mostrarProductos();
