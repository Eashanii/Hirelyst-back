//models/recommendation.js
import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    seeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seeker",
      required: true,
    },
    recommendedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    reason: {
      type: String,
      default: "Based on your profile and skills",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recommendation", recommendationSchema);
