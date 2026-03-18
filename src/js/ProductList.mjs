productCardTemplate =(product)=>{
    return `
    <li class="product-card">
        <a href="product_pages/?product=${product.Id}">
        <img src="" alt="${product.Name}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

class ProductList{
    constructor(_category, _dataSource){
        this.category = _category;
        this.dataSource = _dataSource;
        this.listElement =  _listElement;
    }

    renderList=(list)=>{
        const htmlStrings = list.map(productCardTemplate);
        this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    };
    
    async init(){{
        const list = await this.dataSource.getData();
    }}
}