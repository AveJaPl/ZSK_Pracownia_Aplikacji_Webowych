import mongoose from "mongoose";
import { Schema } from "mongoose";
const randDataSchema = new Schema({
    key: String,
    value: mongoose.Schema.Types.Mixed,
});

export const randDataModel = mongoose.model("randData", randDataSchema);