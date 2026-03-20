import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

   // attach events AFTER rendering
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", removeFromCart);
  });

  displayCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <!-- dynamic ID -->
  <span class="remove-item" data-id="${item.Id}" title="Remove item">X</span>
</li>`;

  return newItem;
}

function displayCartTotal(cartItems) {
  if (cartItems && cartItems.length > 0) {
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotal = document.querySelector(".cart-total");

    cartFooter.classList.remove("hide");

    let total = 0;

    cartItems.forEach((item) => {
      total += item.FinalPrice;
    });

    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
  }
}



function removeFromCart(event) {
  const id = event.target.dataset.id;

  let cart = getLocalStorage("so-cart") || [];

  // ✅ remove item by Id
  cart = cart.filter(item => item.Id != id);

  // ✅ save updated cart
  localStorage.setItem("so-cart", JSON.stringify(cart));

  // ✅ re-render
  renderCartContents();
}

renderCartContents();
