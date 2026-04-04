import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("products");

const product = new productDetails(productId, dataSource);
product.init();
