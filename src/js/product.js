import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import productDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("products");

const dataSource = new ExternalServices("tents");

const product = new productDetails(productId, dataSource);
product.init();
