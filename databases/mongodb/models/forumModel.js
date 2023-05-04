import mongoose from "mongoose";
import validator from "validator";

const model = mongoose.model;
const Schema = mongoose.Schema;

const ForumSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "please Enter Title"],
    },
    description: {
      type: String,
      required: [true, "please Enter Description"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
        type: String,
        enum: ["Tesis", "Skripsi", "Penelitian", "Essay", "Dll"],
        required: true,
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Discussion",
      },
    ],
  },
  { timestamps: true }
);

const ForumModel = model("Forum", ForumSchema);
export default ForumModel;
