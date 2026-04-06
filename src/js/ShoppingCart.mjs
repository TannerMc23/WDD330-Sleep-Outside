/*import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }
  async init() {
    const list = getLocalStorage(this.key);
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }
  calculateListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + item);
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    document.querySelector(".list-total").innerText += ` $${this.total}`;
  }
}*/

import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const isDiscounted =
    item.SuggestedRetailPrice &&
    item.FinalPrice < item.SuggestedRetailPrice;

  const discountPercent = isDiscounted
    ? Math.round(
        ((item.SuggestedRetailPrice - item.FinalPrice) /
          item.SuggestedRetailPrice) *
          100
      )
    : 0;

  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>

      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">
        ${item.Colors?.[0]?.ColorName || "N/A"}
      </p>

      <p class="cart-card__quantity">qty: 1</p>

      <p class="cart-card__price">
        $${item.FinalPrice}
        ${
          isDiscounted
            ? `<span class="original-price">$${item.SuggestedRetailPrice}</span>
               <span class="discount">-${discountPercent}%</span>`
            : ""
        }
      </p>

      <span class="remove-item" data-id="${item.Id}">X</span>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(key, outputSelector) {
    this.key = key;
    this.parentElement = document.querySelector(outputSelector);
    this.cartItems = [];
  }

  init() {
    this.cartItems = getLocalStorage(this.key) || [];

    this.renderCart();
    this.attachEvents();
    this.calculateTotal();
  }

  renderCart() {
    if (!this.cartItems.length) {
      this.parentElement.innerHTML = "<p>Your cart is empty</p>";
      return;
    }

    renderListWithTemplate(
      cartItemTemplate,
      this.parentElement,
      this.cartItems,
      "afterbegin",
      true
    );
  }

  attachEvents() {
    this.parentElement.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.removeItem(e.target.dataset.id);
      });
    });
  }

  removeItem(id) {
    this.cartItems = this.cartItems.filter((item) => item.Id != id);

    setLocalStorage(this.key, this.cartItems);

    this.renderCart();
    this.attachEvents();
    this.calculateTotal();
  }

  calculateTotal() {
    const totalElement = document.querySelector(".cart-total");
    const footer = document.querySelector(".cart-footer");

    if (!this.cartItems.length) {
      footer?.classList.add("hide");
      return;
    }

    let total = 0;

    this.cartItems.forEach((item) => {
      total += Number(item.FinalPrice);
    });

    footer?.classList.remove("hide");

    if (totalElement) {
      totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
    }
  }
}