import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    key: String,
    value: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export const DataModel = mongoose.model("Data", dataSchema);