import { Express } from "express";
import { tourRoutes } from "./tour.client";

const clientRoutes = (app: Express) => {
  app.use(`/tours`, tourRoutes)
}

export default clientRoutes;