import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

// ✅ Route to get the current logged-in user's info
userRouter.get("/currentuser", isAuth, getCurrentUser);

export default userRouter;
