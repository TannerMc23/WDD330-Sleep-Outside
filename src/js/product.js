import {getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails  from "./productDetails";



const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new productDetails(productId, dataSource);
product.init();

