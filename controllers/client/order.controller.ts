import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate";

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

  console.log(dataOrder);

  const order = await Order.create(dataOrder);

  const orderId = order.dataValues.id;
  const code = generateOrderCode(orderId);
  await order.update({ code });

  res.json({
    code:200,
    message:"dat hang thanh cong",
    orderCode: code
  });
};