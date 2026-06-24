import { obtenerCarrito } from "./storage.js";

import {
  eliminarProducto,
  vaciarCarrito,
} from "./funcionesCarrito.js";

import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");

  const acciones = document.getElementById("acciones-carrito");

  contenedor.innerHTML = "";
  acciones.innerHTML = "";

  const resumen = document.getElementById("resumen-carrito");

    resumen.innerHTML = "";

    let total = 0;

  if (!carrito.length) {
    contenedor.innerHTML = "<p class='mensaje-carrito-vacio'>Tu carrito está vacío.</p>";
    return;
  }

  const productosAgrupados = [];

carrito.forEach((producto) => {

  const existente = productosAgrupados.find(
    (p) => p.id === producto.id
  );

  if (existente) {
    existente.cantidad++;
  } else {
    productosAgrupados.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      img: producto.img,
      cantidad: 1
    });
  }
});

productosAgrupados.forEach((producto) => {

    const tarjeta = document.createElement("article");

    tarjeta.classList.add("card");

    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    tarjeta.innerHTML = `
        <img src="../${producto.img}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio.toLocaleString("es-AR")}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Subtotal: $${subtotal.toLocaleString("es-AR")}</p>

        <button class="btn btn-eliminar-carrito">
            Eliminar uno
        </button>`;

    tarjeta
      .querySelector("button")
      .addEventListener("click", () => {
        eliminarProducto(producto.id);
        renderizarCarrito();
      });

    contenedor.appendChild(tarjeta);
  });

  const btn = document.createElement("button");

  btn.classList.add(
    "btn",
    "btn-vaciar-carrito"
  );

  btn.textContent = "Vaciar carrito";

  btn.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  acciones.appendChild(btn);
  resumen.innerHTML = `
  <h2>Total: $${total.toLocaleString("es-AR")}</h2>`;
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});