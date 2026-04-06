import { getLocalStorage, setLocalStorage, CounterCart, renderBreadcrumb } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    /*this.cartcountrender();*/

    renderBreadcrumb(this.product.Category, null, true);

    const button = document.getElementById("addToCart");

    if (button) {
    button.addEventListener("click", this.addProductToCart.bind(this));
    }

    console.log(document.getElementById("addToCart"));
  }

  addProductToCart() {
    console.log("CLICK WORKED");
    const cartItems = getLocalStorage("so-cart") || [];

    const productToAdd = {
      Id: this.product.Id,
      Name: this.product.Name,
      Image: this.product.Image,
      FinalPrice: this.product.FinalPrice,
      SuggestedRetailPrice: this.product.SuggestedRetailPrice,
      Colors: this.product.Colors,
    };

    cartItems.push(productToAdd);

    setLocalStorage("so-cart", cartItems);

    console.log("Cart updated:", cartItems);
    console.log("Adding product:", this.product);
    //  update counter AFTER adding
    this.cartcountrender();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }

  cartcountrender() {
    const cart = getLocalStorage("so-cart") || [];
    const cartcount = document.querySelector(".cart-count");

    if (cartcount) {
      CounterCart(cart, cartcount);
    }
  }
}

function productDetailsTemplate(product) {
  if (!product) return;
  const isDiscounted =
    product.SuggestedRetailPrice &&
    product.FinalPrice < product.SuggestedRetailPrice;

  const discountPercent = isDiscounted
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100
      )
    : 0;

  const savings = isDiscounted
    ? (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)
    : 0;

  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  const priceElement = document.getElementById("productPrice");
  priceElement.textContent = `$${product.FinalPrice}`;

  if (isDiscounted) {
    priceElement.innerHTML += `
      <span class="original-price">$${product.SuggestedRetailPrice}</span>
      <span class="discount">-${discountPercent}%</span>
      <span class="savings">Save $${savings}</span>
    `;
  }

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent =
    product.Colors?.[0]?.ColorName || "No color";
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}


// Template for product details
/*function productTemplate(product) {
  if (!product) return;

  const isDiscounted =
    product.SuggestedRetailPrice &&
    product.FinalPrice < product.SuggestedRetailPrice;

  const discountPercent = isDiscounted
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100
      )
    : 0;

  const savings = isDiscounted
    ? (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)
    : 0;

  const parent = document.querySelector(".product-detail");

  const details = `
    <h3>${product.Name}</h3>
    <h2>${product.NameWithoutBrand}</h2>

    <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}">

    <p class="product-card__price">
      $${product.FinalPrice}
      ${
        isDiscounted
          ? `
        <span class="original-price">$${product.SuggestedRetailPrice}</span>
        <span class="discount">-${discountPercent}%</span>
        <span class="savings">Save $${savings}</span>
      `
          : ""
      }
    </p>

    <p class="product__color">
      ${product.Colors?.[0]?.ColorName || "No color"}
    </p>

    <div class="product-detail__add">
      <button id="addToCart">Add to Cart</button>
    </div>
  `;

  parent.innerHTML = details;
}*/
