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