import express from "express";
import { getRace } from "../controller/raceController.js";

const router = express.Router();

router.post("/getRace", getRace);

export default router;
