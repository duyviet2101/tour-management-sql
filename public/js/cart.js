// lay data api
const drawListTour = () => {
  fetch("/cart/list-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: localStorage.getItem("cart"),
  })
    .then(res => res.json())
    .then(data => {
      const tours = data.tours;
  
      const htmls = tours.map((item, index) => {
        return `
        <tr>
          <td>${index + 1}</td>
          <td><img src="${item.image}" alt="${item.info.title}" width="80px"></td>
          <td><a href="/tours/detail/${item.info.slug}">${item.info.title}</a></td>
          <td>${item.price_special.toLocaleString()}đ</td>
          <td><input 
            type="number" 
            name="quantity" 
            value="${item.quantity}" 
            min="1" 
            item-id="${item.tourId}" 
            style="width: 60px">
          </td>
          <td>${item.total.toLocaleString()}đ</td>
          <td>
            <button 
              class="btn btn-sm btn-danger" 
              btn-delete="${item.tourId}"
            >
              Xóa
            </button>
          </td>
        </tr>
        `
      });
  
      const listTour = document.querySelector("[list-tour]");
      listTour.innerHTML = htmls.join("");
  
      // Tính tổng đơn hàng
      const totalPrice = tours.reduce((sum, item) => sum + item.total, 0);
      const elementTotalPrice = document.querySelector("[total-price]");
      elementTotalPrice.innerHTML = totalPrice.toLocaleString();
      // end tính tổng đơn hàng
  
      deleteItemInCart();

      updateQuantityInCart();
    })
}
drawListTour();
// end lay data api


// Xoá sản phẩm trong cart
const deleteItemInCart = () => {
  const listBtnDelete = document.querySelectorAll("[btn-delete]");
  listBtnDelete.forEach(button => {
    button.addEventListener("click", () => {
      const tourId = button.getAttribute("btn-delete");
      const cart = JSON.parse(localStorage.getItem("cart"));
      const newCart = cart.filter(item => item.tourId != tourId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      
      drawListTour();
    });
  });
}
// end Xoá sản phẩm trong cart

// cap nhat so luong sản phẩm trong cart
const updateQuantityInCart = () => {
  const listInput = document.querySelectorAll("[list-tour] input[name='quantity']");
  listInput.forEach(input => {
    input.addEventListener("change", () => {
      const tourId = input.getAttribute("item-id");
      const quantity = parseInt(input.value);

      const cart = JSON.parse(localStorage.getItem("cart"));
      const tourUpdate = cart.find(item => item.tourId == tourId);
      tourUpdate.quantity = quantity;

      console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      drawListTour();
    });
  });
}
// end cap nhat so luong sản phẩm trong cart

// Đặt hàng
const formOrder = document.querySelector("[form-order]");
if(formOrder) {
  formOrder.addEventListener("submit", (event) => {
    event.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart"));

    const fullName = event.target.elements.fullName.value;
    const phone = event.target.elements.phone.value;
    const note = event.target.elements.note.value;

    const data = {
      info: {
        fullName: fullName,
        phone: phone,
        note: note
      },
      cart: cart
    };

    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  });
}
// end Đặt hàng