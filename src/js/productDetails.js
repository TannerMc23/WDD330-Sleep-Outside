
import { getLocalStorage,setLocalStorage } from "./utils.mjs";




export default class productDetails {

  constructor(productId, datasource) {
    this.productId = productId;
    this.product = {};
    this.datasource = datasource;
  }

  async init() {
    this.product = await this.datasource.findProductById(this.productId);
    this.renderProductDetails();

    // add listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
  renderProductDetails() {
    productTemplate(this.product);
  }

  addProductToCart() {

    const cartItems =  getLocalStorage("so-cart") || [];
    this.counter(cartItems);
    this.updateCartCount();
  }

  // count product in the panier

     counter(items){
    const existingproduct = items.find((item)=>item.Id === this.product.Id);

    //if the product exist then when add a 1 on the pannier
    if(existingproduct){
      existingproduct.quantity+=1;
    } else{
      const addproduct = {...this.product, quantity:1};
      items.push(addproduct);
    }
    setLocalStorage("so-cart", items);

    console.log(items);
          }

           updateCartCount() {
            const cartItems = getLocalStorage("so-cart") || [];
            const cartBadge = document.querySelector(".cart-count");

            if (!cartBadge) return; // sécurité si l'élément n'existe pas

              // calcule le total de quantité
                const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

                  cartBadge.textContent = totalQuantity;

              }
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

