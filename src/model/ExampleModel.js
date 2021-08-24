import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    label: { type: String, required: true },
});

export default mongoose.model(`Example`, Schema);
