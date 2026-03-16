import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const dataSource = new ProductData("tents");

const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

function addProductToCart(item) {
  const cartItems = getLocalStorage("so-cart") || [];
  const newcartItems = [...cartItems, item];
  setLocalStorage("so-cart", newcartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const item = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(item);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
