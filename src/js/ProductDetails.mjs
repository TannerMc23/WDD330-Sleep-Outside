import { getLocalStorage, setLocalStorage, CounterCart } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();
    this.cartcountrender();

    console.log(document.getElementById("addToCart"));
  }

  renderProductDetails() {
    productTemplate(this.product);

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    console.log("CLICK WORKED");
    const cartItems = getLocalStorage("so-cart") || [];

    const productToAdd = {
      Id: this.product.Id,
      Name: this.product.Name,
      Image: this.product.Image,
      FinalPrice: this.product.FinalPrice,
      Colors: this.product.Colors,
    };

    cartItems.push(productToAdd);

    setLocalStorage("so-cart", cartItems);

    console.log("Cart updated:", cartItems);
    console.log("Adding product:", this.product);
    //  update counter AFTER adding
    this.cartcountrender();
  }

  cartcountrender() {
    const cart = getLocalStorage("so-cart") || [];
    const cartcount = document.querySelector(".cart-count");

    if (cartcount) {
      CounterCart(cart, cartcount);
    }
  }
}

// Template for product details
function productTemplate(product) {
  const parent = document.querySelector(".product-detail");

  if (!product) return;

  const details = `
    <h3>${product.Name}</h3>
    <h2>${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}">
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors?.[0]?.ColorName || "N/A"}</p>

    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;

  parent.innerHTML = details;
}
