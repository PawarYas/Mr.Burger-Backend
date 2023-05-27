import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    photo: String,
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("Users", UserSchema);

export default User;