import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

// import sequelize from "./config/database";
import clientRoutes from "./routes/client/index.client";
// sequelize;

const app: Express = express();
const port: number | string = process.env.PORT || 3012;

app.set("views", "./views");
app.set("view engine", "pug");

clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}`);
});