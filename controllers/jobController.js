import Job from "../models/job.js";

export const addJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res
      .status(201)
      .json({ status: "success", message: "Job created successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
