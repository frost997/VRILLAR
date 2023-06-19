import express from "express";
import { getDriver } from "../controller/driverController.js";

const router = express.Router();

router.get("/:category/:id", getDriver);

router.get("/:category/", getDriver);

export default router;
