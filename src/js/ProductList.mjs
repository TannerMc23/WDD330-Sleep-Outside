import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    // CHANGE 1 (Step 7): The API uses product.Images.PrimaryMedium instead of product.Image
    // CHANGE 2: The link should now go to /product_pages/index.html?product=${product.Id}
    return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // CHANGE 3 (Step 6): We pass the category to the getData method
    const list = await this.dataSource.getData(this.category);
    
    // We filter the list so that not too many appear (optional, but recommended)
    // const filteredList = this.filterList(list);
    
    this.renderList(list);
  }

  renderList(list) {
    // We clean the list before rendering in case there was anything there before
    this.listElement.innerHTML = "";
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}