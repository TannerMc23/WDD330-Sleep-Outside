import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();

  const dataSource = new ProductData("tents");
  const element = document.querySelector(".product-list");
  const productList = new ProductList("Tents", dataSource, element);

  productList.init();

  const alertSystem = new Alert("/src/public/json/alerts.json");
  alertSystem.init();
});
