// controllers/applicationController.js
import Application from "../models/Application.js";
import Job from "../models/job.js";

// Create a new application
export const createApplication = async (req, res) => {
  try {
    const { job, seeker } = req.body;

    const jobData = await Job.findById(job);
    if (!jobData) return res.status(404).json({ message: "Job not found" });

    if (jobData.expiry_date && new Date(jobData.expiry_date) < new Date()) {
      return res.status(400).json({ message: "Cannot apply. Job expired." });
    }

    const existing = await Application.findOne({ job, seeker });
    if (existing) return res.status(400).json({ message: "Already applied." });

    const newApplication = new Application({ job, seeker });
    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("Error in createApplication:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get applications by seeker
export const getApplicationsBySeeker = async (req, res) => {
  try {
    const { seekerId } = req.params;
    const applications = await Application.find({ seeker: seekerId }).populate(
      "job",
      "title expiry_date"
    );
    res.json(applications);
  } catch (err) {
    console.error("Error in getApplicationsBySeeker:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
