import express from "express";
import helloRouter from "./hello/hello.router";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/hello", helloRouter);
export default router;
