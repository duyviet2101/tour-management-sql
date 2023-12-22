import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import moment = require("moment");
dotenv.config();

// import sequelize from "./config/database";
import clientRoutes from "./routes/client/index.route";
// sequelize;

const app: Express = express();
const port: number | string = process.env.PORT || 3012;

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

// app local variables
app.locals.moment = moment;

// client routes
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}`);
});