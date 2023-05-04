// import 
import mongoose from "mongoose";
import validator from "validator";

const model = mongoose.model;
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
            required: true,
        },
        price : {
            type : Number,
            required : true
        },
        paymentOption : {
            type : String,
            enum : ["Lunas","Cicilan"],
            required : true
        },
        paymentDate : {
            type : Date,
            required : true
        },
        paymentProof : {
            type : String,
            required : true
        }
    },
        { timestamps: true,  }
);

const PaymentModel = model("Payment", PaymentSchema);
export default PaymentModel;

