import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";

// [POST] /order/
export const order = async (req: Request, res: Response) => {
  const data = req.body;
  
  const dataOrder = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial",
  }

  const order = await Order.create(dataOrder);

  const orderId = order.dataValues.id;
  const code = generateOrderCode(orderId);
  await order.update({ code });

  // Lưu data và bảng orders_item
  for (const item of data.cart) {
    const dataItem = {
      orderId: orderId,
      tourId: item.tourId,
      quantity: item.quantity,
    };

    const tourInfo = await Tour.findOne({
      where: {
        id: item.tourId,
        deleted: false,
        status: "active",
      },
      raw: true,
    });

    dataItem["price"] = tourInfo["price"];
    dataItem["discount"] = tourInfo["discount"];
    dataItem["timeStart"] = tourInfo["timeStart"];

    await OrderItem.create(dataItem);
  }

  res.json({
    code:200,
    message:"dat hang thanh cong",
    orderCode: code
  });
};

// [GET] /order/success
export const success = async (req: Request, res: Response) => {
  res.render("client/pages/order/success", {
    pageTitle: "Đặt hàng thành công"
  });
};