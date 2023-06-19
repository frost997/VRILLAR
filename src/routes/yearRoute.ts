import express from "express";
import { getYear, getYearlyRanking } from "../controller/yearController.js";

const router = express.Router();
router.get("/:year/:category", getYearlyRanking);
router.get("/:year/", getYear);
export default router;
