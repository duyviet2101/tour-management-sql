import { Request, Response } from "express";
import Tour from "../../models/tour.model";

export const index = async (req: Request, res: Response) => {
  //? SELECT * from tours where deleted = false and status = "active";
  const tours = await Tour.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true
  });

  res.render("client/pages/tours/index", {
    title: "Danh sách Tours",
    tours: tours
  });
}