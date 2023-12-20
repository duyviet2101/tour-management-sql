import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/database";
import Tour from "./models/tour.model";
sequelize;

const app: Express = express();
const port: number | string = process.env.PORT || 3012;

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/tours", async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    raw: true
  });

  res.render("client/pages/tours/index", {
    tours: tours
  });
});

app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}`);
});