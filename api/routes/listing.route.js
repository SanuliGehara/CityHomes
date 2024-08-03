import express from "express";
import {
  createListing,
  deleteUserListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteUserListing);
router.post("/update/:id", verifyToken, updateListing);

export default router;
