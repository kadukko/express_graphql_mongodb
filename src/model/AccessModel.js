import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    active: {type: Boolean, required: true, default: true}
});

export default mongoose.model(`Access`, Schema);
