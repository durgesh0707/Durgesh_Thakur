// routes/admin.js ✅
import express from "express";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  getAllUsers,
  deleteUser,
  getAllProperties,
  approveProperty,
} from "../controllers/admin.controller.js";

const router = express.Router();

// 👥 User routes
router.get("/users", isAuth, isAdmin, getAllUsers);
router.delete("/user/:id", isAuth, isAdmin, deleteUser);

// 🏡 Property routes
router.get("/properties", isAuth, isAdmin, getAllProperties);
router.put("/property/:id/approve", isAuth, isAdmin, approveProperty);

export default router;
