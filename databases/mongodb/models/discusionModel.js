// import mongoose
import mongoose from "mongoose";
import validator from "validator";

// import model and schema
const model = mongoose.model;
const Schema = mongoose.Schema;

// create schema
const DiscussionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    forum: {
      type: Schema.Types.ObjectId,
      ref: "Forum",
      required: true,
    },
    content: {
      type: String,
      required: [true, "please Enter Comment"],
    },
    // make file optional
    file: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// create model
const DiscussionModel = model("Discussion", DiscussionSchema);
export default DiscussionModel;
