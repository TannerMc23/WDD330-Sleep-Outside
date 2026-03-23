import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.js";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productId = getParam("products");

const product = new ProductDetails(productId, dataSource);
product.init();
