/*import { loadHeaderFooter, getParam, renderBreadcrumb } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

async function initPage() {
  loadHeaderFooter();

  const category = getParam("category");
  const dataSource = new ExternalServices();
  const element = document.querySelector(".product-list");
  const listing = new ProductList(category, dataSource, element);

  await listing.init();

  renderBreadcrumb(category, element.children.length);
}

initPage();*/

import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();