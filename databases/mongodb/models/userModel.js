import mongoose from "mongoose";
import validator from "validator";

const model = mongoose.model;
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["admin", "client","mentor"],
      default: "client",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: [true, "Email has been Taked"],
      index: true,
      validate: [validator.isEmail, "Email Not correct!"],
    },
    phone: {
      type: String,
      unique: [true, "Phone has been Taked"],
      index: true,
      validate: [validator.isMobilePhone, "Phone Not correct!"],
    },
    
    password: {
      type: String,
      required: [true, "please Enter Password"],
      minlength: [8, "please > 8"],
    },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);
UserModel.createIndexes();
export default UserModel;
