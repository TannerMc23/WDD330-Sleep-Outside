import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// We instantiate the data source (tents.json)
const dataSource = new ProductData("tents");

// Search for the <ul> where the products will be displayed
const listElement = document.querySelector(".product-list");

// Instance created from the list and start
const listing = new ProductList("tents", dataSource, listElement);

listing.init();