const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
  } catch (error) {
    console.error("isAdmin middleware error:", error);
    return res.status(500).json({ message: "Server error in admin check" });
  }
};

export default isAdmin;
