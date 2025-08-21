import express from "express";
import { login, logOut, sighUp } from "../controllers/auth.controller.js";
import isAuth from "../middleware/isAuth.js";

const authRouter = express.Router();

// Signup
authRouter.post("/signup", sighUp);

// Login
authRouter.post("/login", login);

// Logout
authRouter.post("/logout", logOut);

// ✅ Get Current Logged-In User Info
authRouter.get("/me", isAuth, async (req, res) => {
  try {
    const { _id, name, email, role } = req.user;
    res.status(200).json({
      _id,
      name,
      email,
      isAdmin: role === "admin", // ✅ Correct conversion
    });
  } catch (error) {
    console.error("Error in /me route:", error);
    res.status(500).json({ message: "Could not fetch user info" });
  }
});

export default authRouter;
