import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    location: { type: String },
    qualifications: [String],
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Employer",
    //   required: true,
    // },
    salary: { type: String },
    expiry_date: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
