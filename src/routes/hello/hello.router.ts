import express from "express";
import { HelloController } from "./hello.controller";

const router = express.Router();
const controller = new HelloController();

router.get("/", controller.hello);
router.get("/error", controller.reject);

export default router;
