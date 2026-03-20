import { getLocalStorage, setLocalStorage, CounterCart } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((items) => cartItemTemplate(items));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  //const productId = getParam("product")


document.querySelectorAll(".delete").forEach(buton=>{
  if(buton.classList.contains("delete")){
    buton.addEventListener("click",()=>{
      const productId = buton.dataset.id;
      filterCart(cartItems,productId)
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

renderCartContents();

// Count Cart
const cartItems = getLocalStorage("so-cart");
const cart = document.querySelector(".cart-count");

CounterCart(cartItems,cart)

//DELETE WORKFLOW

// 1. find a cart by filterering empty cart

function filterCart(cart, Id){
  const list = cart.filter(item=> item.id != Id);
    setLocalStorage("so-cart",list)
}
