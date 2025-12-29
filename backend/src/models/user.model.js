import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: "String",
      required: true,
      unique: true,
      lowerCase: true,
      trim: true, //
      minLength: 3,
      maxLength: 30,
    },
    password: {
      type: "String",
      required: true,
      minLength: 6,
      maxLength: 30,
    },
    email: {
      type: "String",
      required: true,
      unique: true,
      lowerCase: true,
      trim: true, //
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
