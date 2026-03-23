import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from './Alert.js';


loadHeaderFooter();

const dataSource = new ProductData("tents");;
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

productList.init();

document.addEventListener('DOMContentLoaded', () => {
  const alertSystem = new Alert('/alerts.json');
  alertSystem.init();
});