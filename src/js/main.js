import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getLocalStorage, CounterCart } from "./utils.mjs";

const productdata = new ProductData("tents");

const datalist = new ProductList(
  "tents",
  productdata,
  document.querySelector(".product-list"),
);
datalist.init();

const counter = document.querySelector(".cart-count");

const cartdata = getLocalStorage("so-cart");

CounterCart(cartdata, counter);
console.log(cartdata.length);
