(function () {
  "use strict";
  let totalPrice,
    totalQuantity = 0;

  const updateCart = () => {
    document.querySelector(".js-price-total").innerHTML = totalPrice;
    document.querySelector(".js-qty-total").innerHTML = totalQuantity;
  };

  const clearCar = () => {};

  //handle single product box
  const addToCart = (productBox) => {
    const price = productBox.dataset.price;
    const quantity = productBox.querySelector(".js-qty");

    //validation for only positive values
    if (quantity.value === "" || quantity.value < 1) {
      quantity.value = 1;
    }

    totalPrice += quantity.value * price;
    totalQuantity += +quantity.value;
    quantity.value = "";

    updateCart();
  };

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

  //helpers
  function show(el) {
    el.hidden = false;
  }

  function hide(el) {
    el.hidden = true;
  }
})();
