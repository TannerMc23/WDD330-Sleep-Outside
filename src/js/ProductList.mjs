import { renderListWithTemplate } from "./utils.mjs";

const productCardTemplate = (product, category)=>{

    let sourceimg="";
    (typeof product.Images === "string")? sourceimg= product.Images : sourceimg = product.Images.PrimaryMedium ?? "";
   return `
       <li>
        <a href="../product_pages/index.html?product=${product.Id}&category=${category}">
            <img src="${sourceimg}" alt="Image of ${product.NameWithoutBrand}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.Name}</h3>
            <p class="product-card">$ ${product.FinalPrice}</p>
        </a>
       </li>
    `;
}

// Liste of product

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

    renderList(list){
        const templateWithcategory = (product)=>productCardTemplate(product, this.category)
       renderListWithTemplate(templateWithcategory,this.listElement,list,"afterbegin",true)

}