import genToken from "../config/token.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

// ✅ Signup — new users are regular users only
export const sighUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role: "user",
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.role === "admin",
    });
  } catch (error) {
    return res.status(500).json({ message: `signup error: ${error}` });
  }
};

// ✅ Login — returns role-based isAdmin flag
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate(
      "listing",
      "title image1 image2 image3 description rent category city landMark"
    );

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.role === "admin",
    });
  } catch (error) {
    return res.status(500).json({ message: `login error: ${error}` });
  }
};

// ✅ Logout — clears cookie
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout error: ${error}` });
  }
};

// ✅ Get current user — add this in frontend to verify role
export const getMe = async (req, res) => {
  try {
    const { _id, name, email, role } = req.user;
    res.status(200).json({ _id, name, email, isAdmin: role === "admin" });
  } catch (error) {
    res.status(500).json({ message: `getMe error: ${error.message}` });
  }
};
