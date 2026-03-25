import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// 1. We load the Header and Footer automatically
loadHeaderFooter();

// 2. We get the category from the URL using the getParam utility
// Example: if the URL is .../index.html?category=tents, category will be "tents"
const category = getParam("category");

// 3. We create an instance of ProductData (our data source)
const dataSource = new ProductData();

// 4. We select the HTML element where we want the products to appear
const listElement = document.querySelector(".product-list");

// 5. We create the ProductList instance and pass it the information
const myList = new ProductList(category, dataSource, listElement);

// 6. Finally, we call the init method to start the magic
myList.init();

// 7. Extra: We dynamically change the H2 title so the user knows what they are viewing
const titleElement = document.querySelector(".title");
if (titleElement && category) {
  // This puts the first letter in uppercase (e.g.: "tents" -> "Tents")
  titleElement.innerHTML = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
}