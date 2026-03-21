import { getLocalStorage, setLocalStorage, CounterCart } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((items) => cartItemTemplate(items));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");


document.querySelectorAll(".delete").forEach(buton=>{
  if(buton.classList.contains("delete")){
    buton.addEventListener("click",()=>{
      const productId = buton.dataset.id;
      filterCart(productId)
    })
  }
  return;
})
}


function cartItemTemplate(item) {
  const newItem = `
  <div class="box">
    <li class="cart-card divider">
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
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>
    <h1 class="delete" data-id="${item.Id}">
  <a href="#">x</a>
</h1>
  </div>
  `;

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

// Count Cart
const cartItems = getLocalStorage("so-cart");
const cart = document.querySelector(".cart-count");

CounterCart(cartItems,cart)

//DELETE WORKFLOW

// 1. find a cart by filterering empty cart

function filterCart(Id){
  let cart = getLocalStorage("so-cart") || [];

   const updatedCart=cart.filter(item=> item.Id != Id);
    setLocalStorage("so-cart",updatedCart)
    return updatedCart
}
