import { getLocalStorage } from "./utils.mjs";


export default class productDetails{
    constructor(productId, datasource){
        this.productId=productId;
        this.product=[];
        this.datasource=datasource;

    }

         renderProductDetails(){
        //gere we put details of the card
    }
    Infinity(){
        //initialise
    }

     addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];

  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}
}