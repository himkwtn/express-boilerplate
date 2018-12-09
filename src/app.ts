import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import dotenv from "dotenv";
import { initializeDatabase } from "./config/db";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initializeDatabase();
app.use("/", routes);

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err["status"] = 404;
  next(err);
});

app.use((err: Error, req, res, next) => {
  res.status(err["status"] || 500);
  res.send(err);
});
