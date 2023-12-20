import { Request, Response } from "express";
import Category from "../../models/category.model";

// GET /categories/
export const index = async (req: Request, res: Response) => {
  //? SELECT * from categories where deleted = false and status = "active";
  
  const categories = await Category.findAll({
    where: {
      deleted: false, 
      status: "active"
    },
    raw: true
  })

  res.render("client/pages/categories/index", {
    title: "Danh mục tours",
    categories: categories
  });
}