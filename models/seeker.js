// models/seeker.js
import mongoose from "mongoose";

const seekerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Added password
  phone: String,
  skills: [String],
  experience: String,
  education: String,
  portfolio: String,
  jobType: String,
  workPreference: String,
  salaryExpectation: String,
  location: String,
});

const Seeker = mongoose.models.Seeker || mongoose.model("Seeker", seekerSchema);
export default Seeker;
