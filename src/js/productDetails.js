import { getLocalStorage, setLocalStorage } from "./utils.mjs";


export default class productDetails{
    constructor(productId, datasource){
        this.productId = productId;
        this.product = [];
        this.datasource = datasource;
        this.productList=[];

    }

    
    async init(){

        this.product = await this.datasource.findProductById(this.productId);
        this.renderProductDetails();
        // add listener to Add to Cart button
    document
       .getElementById("addToCart")
       .addEventListener("click",this.addProductToCart.bind(this));
    }
                 renderProductDetails() {
            productTemplate(this.product)
          }

           addProductToCart(product) {
                const cartItems = this.product;
                this.productList.push(cartItems);

                console.log(this.productList);
           }
            
}

 function productTemplate(product){
        const parent = document.querySelector(".product-detail");

        const details = `
                <h3>${product.Name}</h3>
                <h2>${product.NameWithoutBrand}</h2>
                <img  class="divider" src=${product.Image} alter="${product.NameWithoutBrand}">
                <p class="product-card__price"> $ ${product.FinalPrice}</p>
                <p class="product__color">${product.Colors[0].ColorName}</p>

                 <div class="product-detail__add">
                        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
                </div>
            `;

        parent.innerHTML=details;
    }
