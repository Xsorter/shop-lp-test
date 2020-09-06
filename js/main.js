(function () {
  "use strict";
  let totalPrice = 0;
  let totalQuantity = 0;

  const totalPriceElement = document.querySelector(".js-price-total");
  const totalQuantityElement = document.querySelector(".js-qty-total");
  const checkoutButton = document.querySelector(".js-check");
  const popup = document.querySelector(".js-popup");

  const messages = {
    error: "Пожалуйста, заполните все поля формы",
    success: "Спасибо за заказ! Мы свяжемся с Вами в ближайшее время",
  };

  //helpers
  const show = (el) => {
    el.hidden = false;
  };

  const hide = (el) => {
    el.hidden = true;
  };

  const updateCart = () => {
    checkoutButton.disabled = false;
    totalPriceElement.innerHTML = totalPrice;
    totalQuantityElement.innerHTML = totalQuantity;
  };

  //reset card UI to init state
  const clearCart = () => {
    totalPriceElement.innerHTML = "XXX";
    totalQuantityElement.innerHTML = "XXX";
    checkoutButton.disabled = true;
    hide(popup);
  };

  //handle single product box
  const addToCart = (productBox) => {
    const price = +productBox.dataset.price;
    let quantity = +productBox.querySelector(".js-qty").value;

    //validation for only positive values
    if (quantity === "" || quantity < 1) {
      quantity = 1;
    }

    totalPrice += quantity * price;
    totalQuantity += quantity;
    quantity = 0;

    updateCart();
  };

  // product filters logic
  const filterProducts = (categoryFilter = 0, priceFilter = 0) => {
    document.querySelectorAll(".js-product").forEach((el) => {
      const category = +el.dataset.category;
      const price = +el.dataset.price;
      let isCategorySimilar,
        isPriceSimilar = true;

      //check for price and category correspondencing to filters
      if (categoryFilter === 0) {
        isCategorySimilar = true;
      } else {
        isCategorySimilar = category === categoryFilter;
      }

      if (priceFilter === 0) {
        isPriceSimilar = true;
      } else {
        isPriceSimilar = price <= priceFilter;
      }

      if (isCategorySimilar && isPriceSimilar) {
        show(el);
      } else {
        hide(el);
      }
    });
  };

  //form validation for empty fields
  const validateForm = (el) => {
    el.preventDefault();
    const isInvalid = [];
    const inputs = el.target.querySelectorAll("input");
    [...inputs].filter((el) => {
      isInvalid.push(el.value.trim() === "");
    });

    if (isInvalid.includes(true)) {
      alert(messages.error);
    } else {
      alert(messages.success);
      clearCart();
    }
  };

  //filters change events delegation
  document.querySelector(".js-filters").onchange = () => {
    const target = event.target;
    const categoryFilter = document.querySelector(".js-filter-cat");
    const priceFilter = document.querySelector(".js-filter-price");
    if (target.tagName != "SELECT") return;
    filterProducts(+categoryFilter.value, +priceFilter.value);
  };

  //add to cart click events delegation
  document.querySelector(".js-products").onclick = () => {
    const target = event.target;
    if (!target.classList.contains("js-add")) return;
    addToCart(target.closest(".js-product"));
  };

  document.querySelector(".js-form").addEventListener("submit", validateForm);
  checkoutButton.addEventListener("click", () => {
    show(popup);
  });

  //hide popup on overlay click
  document.querySelector(".js-popup").onclick = () => {
    const target = event.target;
    if (!target.classList.contains("js-popup")) return;
    hide(popup);
  };
})();
