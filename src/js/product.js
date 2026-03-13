import { getLocalStorage,getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");




//TEAM ACTIVITY 2

//Call the getParam function to see if we have the url

const productId= getParam('product');

console.log('=================');

console.log('Le resultat est');
console.log('-----------------');
console.log(dataSource.findProductById(productId));
console.log('=================');


// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
