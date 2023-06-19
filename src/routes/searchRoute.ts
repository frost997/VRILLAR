import express from "express";
import { search } from "../controller/searchController.js";

const router = express.Router();
router.get("/:search", search);
export default router;
