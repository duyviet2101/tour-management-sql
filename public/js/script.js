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

// Carts
const cart = localStorage.getItem("cart");

// if cart is empty or not exist in local storage then create cart object in local storage with empty array value
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

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
    }
  });
}

// end Carts