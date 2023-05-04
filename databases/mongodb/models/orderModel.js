import mongoose from "mongoose";
import validator from "validator";

const model = mongoose.model;
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
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
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
            required: true,
        },
        planList: [
            {
                type: String,
                enum: ["basic", "standard", "premium"],
                required: true,
            },
        ],

    },
    { timestamps: true }
);

const OrderModel = model("Order", OrderSchema);
export default OrderModel;
