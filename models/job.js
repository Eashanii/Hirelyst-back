// models/job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    location: { type: String },
    qualifications: [String],
    experience: String, // Added
    jobType: String, // Added
    workPreference: String, // Added
    salary: { type: String },
    expiry_date: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
