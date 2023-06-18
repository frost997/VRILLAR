import express from "express";
import {
  getRace,
  getDriver,
  getTeam,
  getYearlyRanking,
  search
} from "../controller/raceController.js";

const router = express.Router();

router.get("/getRace/:year/:grandPrix", getRace);

router.get("/getDriver/:year/:driver", getDriver);

router.get("/getTeam/:year/:car", getTeam);

router.get("/getYearlyRanking/:year/:category", getYearlyRanking);

router.get("/search", search);
export default router;
