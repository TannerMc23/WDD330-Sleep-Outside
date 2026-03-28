import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import productDetails from "./productDetails.js";

const dataSource = new ExternalServices("tents");
const productId = getParam("products");

const product = new productDetails(productId, dataSource);
product.init();
