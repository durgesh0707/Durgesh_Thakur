import jwt from "jsonwebtoken";
import User from "../model/user.model.js"; // ✅ Ensure this is correct

const isAuth = async (req, res, next) => {
  try {
    console.log("🍪 Cookies received:", req.cookies);

    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "User doesn't have a token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔑 Decoded token:", decoded);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.userId);
    console.log("👤 Found user:", user?.email);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("❌ isAuth error:", error.message);
    return res.status(500).json({ message: `isAuth error: ${error.message}` });
  }
};

// ✅ Fix: Default export
export default isAuth;
