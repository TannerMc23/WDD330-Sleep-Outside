import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();
import { getLocalStorage,CounterCart } from "./utils.mjs";

const productdata = new ProductData("tents");

const datalist = new ProductList("tents",productdata,document.querySelector(".product-list"));
const counter = document.querySelector(".cart-count");
datalist.init();

const cartdata = getLocalStorage("so-cart");

CounterCart(cartdata,counter);
console.log(cartdata.length);


