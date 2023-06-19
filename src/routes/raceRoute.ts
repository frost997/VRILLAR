import express from "express";
import { getRace } from "../controller/raceController.js";

const router = express.Router();

router.get("/:grandPrix", getRace);

export default router;
