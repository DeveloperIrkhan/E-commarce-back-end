import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: false,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    userRole: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
