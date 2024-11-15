import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }
);

export const Service = mongoose.model("Service", serviceSchema);