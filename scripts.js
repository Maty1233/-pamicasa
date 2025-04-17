// Variables globales
let productos = [];

// Referencias a elementos del DOM
const container = document.getElementById('productos-container');
const buscador = document.getElementById('buscador');
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.getElementById('menu-toggle');

// Fetch de productos desde tu API
fetch('https://pamicasa-bot-production.up.railway.app/api/productos')
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarProductos(productos);
  })
  .catch(err => {
    console.error('Error cargando productos:', err);
    container.innerHTML = '<p>No se pudieron cargar los productos.</p>';
  });

// Mostrar productos en la galería
function mostrarProductos(lista) {
  container.innerHTML = '';

  if (lista.length === 0) {
    container.innerHTML = '<p>No hay productos disponibles.</p>';
    return;
  }

  lista.forEach(producto => {
    container.innerHTML += `
      <div class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>Precio: $${producto.precio}</p>
        <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${producto.imagen}')">Agregar al carrito</button>
      </div>
    `;
  });
}

// Filtrar productos por subcategoría
function filtrarSubcategoria(subcategoria) {
  const filtrados = productos.filter(p => p.subcategoria === subcategoria);
  mostrarProductos(filtrados);
}

// Buscador en tiempo real
if (buscador) {
  buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();
    const filtrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
  });
}

// Agregar producto al carrito (localStorage)
function agregarAlCarrito(nombre, precio, imagen) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push({ nombre, precio, imagen });
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert('Producto añadido al carrito ✅');
}

// Botón de menú (mostrar/ocultar sidebar)
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
