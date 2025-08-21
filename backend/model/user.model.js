import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    listing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }],
    booking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
