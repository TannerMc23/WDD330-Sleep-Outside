import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productdata = new ProductData("tents");

const datalist = new ProductList("tents",productdata,document.querySelector(".product-list"));

datalist.init();


