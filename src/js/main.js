import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import Alert from './Alert.js';


loadHeaderFooter();

const dataSource = new ExternalServices("tents");;
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

productList.init();

document.addEventListener('DOMContentLoaded', () => {
  const alertSystem = new Alert('/src/public/json/alerts.json');
  alertSystem.init();
});