(function () {
  "use strict";
  const proructsNode = document.querySelector(".products-box");
  const cartValue = document.querySelector(".js-value-total");
  const cartQuantiy = document.querySelector(".js-qty-total");
  const prices = [];

  const handleCart = () => {
    console.log(prices);
  };

  //handle separate product box
  const addToCart = (productBox) => {
    const price = productBox
      .querySelector("[data-price]")
      .getAttribute("data-price");

    const quantity = productBox.querySelector(".js-qty");

    //validation for only positive values
    if (quantity.value === "" || quantity.value < 1) {
      quantity.value = 1;
    }

    prices.push({
      quantity: +quantity.value,
      price: +price,
    });

    handleCart();
  };

  //get button click with events delegation
  proructsNode.onclick = () => {
    const target = event.target;
    if (!target.classList.contains("js-add")) return;
    addToCart(target.closest(".js-product"));
  };
})();
