//models/seeker.js
import mongoose from "mongoose";

const seekerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    experience: { type: String, default: "" },
    education: { type: String, default: "" },
    cv: { type: String, default: "" }, // file path or URL
  },
  { timestamps: true }
);

const Seeker = mongoose.model("Seeker", seekerSchema);
export default Seeker;
