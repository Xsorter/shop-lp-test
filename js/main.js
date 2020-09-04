(function () {
  "use strict";
  const productsNodeList = document.querySelectorAll(".js-product");

  productsNodeList.forEach((el) => {
    const title = el.querySelector(".product-box__title").innerHTML;
    console.log(el);
  });

  //helpers
  function sum(elements) {
    return elements.reduce((a, b) => a + b.value, 0);
  }
})();
