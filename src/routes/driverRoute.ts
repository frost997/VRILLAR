import express from "express";
import { getDriver } from "../controller/driverController.js";

const router = express.Router();

router.get("/:category/:id", getDriver);

export default router;
