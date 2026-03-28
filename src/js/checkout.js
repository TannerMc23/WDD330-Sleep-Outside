import CheckoutProcess from "./CheckoutProcess.mjs";
import { CounterCart, getLocalStorage } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const element = getLocalStorage("so-cart");
  const count = document.querySelector(".cart-count");

  CounterCart(element, count);

  const form = document.querySelector("#checkoutForm");

  (async () => {
    const checkout = new CheckoutProcess("so-cart", ".order-summary");
    await checkout.init();

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        return;
      }

      const result = await checkout.checkout(form);
      //console.log(result);
      return result;
    });
  })();
});
