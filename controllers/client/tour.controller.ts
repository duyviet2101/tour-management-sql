import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";

// GET /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
  //* SELECT * from tours where deleted = false and status = "active";
  // const tours = await Tour.findAll({
  //   where: {
  //     deleted: false,
  //     status: "active"
  //   },
  //   raw: true
  // });
  
  /*
    *SELECT tours.*, price * (1 - discount/100) AS price_special
    *FROM tours
    *JOIN tours_categories ON tours.id = tours_categories.tour_id
    *JOIN categories ON tours_categories.category_id = categories.id
    *WHERE
    *  categories.slug = 'du-lich-trong-nuoc'
    *  AND categories.deleted = false
    *  AND categories.status = 'active'
    *  AND tours.deleted = false
    *  AND tours.status = 'active';
  */

  const slugCategory = req.params.slugCategory;

  const tours = await sequelize.query(`
    SELECT tours.*, ROUND(price * (1 - discount/100), 0) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = '${slugCategory}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active'
  `, {
    type: QueryTypes.SELECT
  });

  tours.forEach(item => {
    if (item["images"]) {
      const images = JSON.parse(item["images"]);
      item["image"] = images[0];
    }

    item["price_special"] = parseFloat(item["price_special"]);
  });

  console.log(tours);

  res.render("client/pages/tours/index", {
    title: "Danh sách Tours",
    tours: tours
  });
}

// GET /tours/detail/:slugTour
export const detail = async (req: Request, res: Response) => {
  const slugTour = req.params.slugTour;

  console.log(slugTour);

  res.render("client/pages/tours/detail", {
    title: "Chi tiết Tour"
  });
};