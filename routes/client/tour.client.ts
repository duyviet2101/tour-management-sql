import { Router, Request, Response } from "express";
const router: Router = Router();

import Tour from "../../models/tour.model";

router.get("/", async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    raw: true
  });

  res.render("client/pages/tours/index", {
    tours: tours
  });
})

export const tourRoutes: Router = router;