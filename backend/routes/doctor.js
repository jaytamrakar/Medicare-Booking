import express from "express";
import {
  deleteDoctor,
  updateDoctor,
  getSingleDoctor,
  getAllDoctors,
} from "../controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

// nester route for reviewing the specifice doctor

router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctors);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

export default router;
