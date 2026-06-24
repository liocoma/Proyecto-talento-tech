import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const renderizarProductos = () => {
  const contenedor =
    document.getElementById("contenedor-tarjetas");

  fetch("./data/productos.json")
    .then((response) => response.json())
    .then((productos) => {
      productos.forEach((producto) => {
        const tarjeta =
          document.createElement("article");

        tarjeta.classList.add("card");

        tarjeta.innerHTML = `
          <img src="./${producto.img}">
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio.toLocaleString("es-AR")}</p>
          <button class="btn">
            Agregar al carrito
          </button>`;

        tarjeta
          .querySelector("button")
          .addEventListener("click", () => {
            agregarAlCarrito(producto);
          });

        contenedor.appendChild(tarjeta);
      });
    });
};

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador(obtenerCarrito());

  renderizarProductos();
});