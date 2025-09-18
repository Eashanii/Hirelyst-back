import mongoose from "mongoose";

const employerSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactPerson: String,
    phone: String,
    industry: String,
    companySize: String,
    website: String,
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Employer ||
  mongoose.model("Employer", employerSchema);
