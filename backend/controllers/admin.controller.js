import User from "../model/user.model.js";
import Listing from "../model/listing.model.js"; // renamed

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const getAllProperties = async (req, res) => {
  const listings = await Listing.find(); // renamed
  res.json(listings);
};

export const approveProperty = async (req, res) => {
  const listing = await Listing.findById(req.params.id); // renamed
  if (!listing) {
    return res.status(404).json({ message: "Property not found" });
  }
  listing.isApproved = true;
  await listing.save();
  res.json({ message: "Property approved" });
};
