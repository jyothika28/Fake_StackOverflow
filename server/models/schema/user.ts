import mongoose from "mongoose";

const UserSchema=new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: false },
  },
  { timestamps: true }
);

export default UserSchema;


