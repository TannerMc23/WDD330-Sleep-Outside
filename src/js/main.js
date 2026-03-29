import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getLocalStorage, CounterCart } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const productdata = new ExternalServices("tents");

  const datalist = new ProductList(
    "tents",
    productdata,
    document.querySelector(".product-list"),
  );
  const counter = document.querySelector(".cart-count");
  datalist.init();

  const cartdata = getLocalStorage("so-cart");
  CounterCart(cartdata, counter);
});
