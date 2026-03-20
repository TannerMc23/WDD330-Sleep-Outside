import { getLocalStorage, setLocalStorage, CounterCart } from "./utils.mjs";

export default class productDetails {
  constructor(productId, datasource) {
    this.productId = productId;
    this.product = {};
    this.datasource = datasource;
  }

  async init() {
    this.product = await this.datasource.findProductById(this.productId);

    this.renderProductDetails();
    //Calling the cart counter
    this.cartcountrender();

    // add listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
  renderProductDetails() {
    productTemplate(this.product);
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];

    // ADD A QUANTITY NUMBER OF ITEM, IF THE ITEM IS ADD THEN QUANTITY = 1 ELSE QUANTY +1
    //filter the item cart to remove the null element and fint the item with the product Id.
   findItem(cartItems, this.product)
  }
  cartcountrender() {
    const cart = getLocalStorage("so-cart");
    const cartcount = document.querySelector(".cart-count");
    CounterCart(cart, cartcount);
  }
}

function findItem(item, productid, product){
  item
  .filter(item=> item != null)
  .find(element => element.Id === productid)
  checkValidation(item, productid, product)
}

function checkValidation(item, produit, card){
  if(item){
    item.quantity =(!item.quantity)? 1 : item.quantity + 1;
    const price = item.FinalPrice * item.quantity;
    setLocalStorage("so-cart", card)
  }
  product.item.quantity = 1;
  cart.push(product)
  setLocalStorage("so-cart",cart)
}

// Template for product details
function productTemplate(product) {
  const parent = document.querySelector(".product-detail");

  const details = `
                <h3>${product.Name}</h3>
                <h2>${product.NameWithoutBrand}</h2>
                <img  class="divider" src=${product.Image} alter="${product.NameWithoutBrand}">
                <p class="product-card__price"> $ ${product.FinalPrice}</p>
                <p class="product__color">${product.Colors[0].ColorName}</p>

                 <div class="product-detail__add">
                        <button id="addToCart" data-id = "${product.Id}">Add to Cart</button>
                </div>
            `;

  parent.innerHTML = details;
}
