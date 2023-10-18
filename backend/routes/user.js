import express from "express";
import {
  deleteUser,
  updateUser,
  getSingleUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getSingleUser);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
