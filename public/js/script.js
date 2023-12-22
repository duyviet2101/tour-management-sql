// swiper for tour detail
var imagesThumb = new Swiper(".imagesThumb", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var imagesMain = new Swiper(".imagesMain", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: imagesThumb,
  },
});
// end swiper for tour detail

const alertAddCartSuccess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-success]");
  if (elementAlert) {
    elementAlert.classList.remove("alert-hidden");
    setTimeout(() => {
      elementAlert.classList.add("alert-hidden");
    }, 3000);

    const closeAlert = document.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
      elementAlert.classList.add("alert-hidden");
    });
  }
}

// Carts
const cart = localStorage.getItem("cart");

  // if cart is empty or not exist in local storage then create cart object in local storage with empty array value
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// Hiển thị thêm số lượng sản phẩm vào mini-cart
const showMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if(miniCart) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    miniCart.innerHTML = totalQuantity;
  }
}
showMiniCart();

  // add tour to cart
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
  formAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();

    const quantity = parseInt(event.target.elements.quantity.value);
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));

    if (quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      const indexExistTour = cart.findIndex((item) => item.tourId === tourId);

      if (indexExistTour !== -1) {
        cart[indexExistTour].quantity += quantity;
      } else {
        cart.push({
          tourId,
          quantity,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      alertAddCartSuccess();

      showMiniCart();

    }
  });
}

// end Carts