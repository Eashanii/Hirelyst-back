import Seeker from "../models/seeker.js";
import Job from "../models/job.js";
import Application from "../models/Application.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Seeker
export const registerSeeker = async (req, res) => {
  try {
    const { fullName, email, password, skills, experience, education } =
      req.body;
    const existing = await Seeker.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Seeker already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const seeker = new Seeker({
      fullName,
      email,
      password: hashedPassword,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => s.trim()),
      experience,
      education,
    });
    await seeker.save();
    res.status(201).json({ message: "Seeker registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Seeker
export const loginSeeker = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seeker = await Seeker.findOne({ email });
    if (!seeker) return res.status(404).json({ message: "Seeker not found" });

    const valid = await bcrypt.compare(password, seeker.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: seeker._id, role: "seeker" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({ message: "Login successful", token, seeker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Seeker Profile
export const getSeekerProfile = async (req, res) => {
  try {
    const seeker = await Seeker.findById(req.user.id).select("-password");
    if (!seeker) return res.status(404).json({ message: "Seeker not found" });
    res.status(200).json(seeker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Seeker Profile
export const updateSeekerProfile = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.skills && typeof updates.skills === "string") {
      updates.skills = updates.skills.split(",").map((s) => s.trim());
    }
    const seeker = await Seeker.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");
    res.status(200).json(seeker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Apply for Job
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const seekerId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (new Date(job.expiry_date) < new Date()) {
      return res.status(400).json({ message: "Job has expired" });
    }

    const existing = await Application.findOne({
      seeker: seekerId,
      job: jobId,
    });
    if (existing)
      return res.status(400).json({ message: "Already applied to this job" });

    const application = new Application({ seeker: seekerId, job: jobId });
    await application.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Recommended Jobs
export const getRecommendedJobs = async (req, res) => {
  try {
    const seeker = await Seeker.findById(req.user.id);
    if (!seeker) return res.status(404).json({ message: "Seeker not found" });

    const seekerSkills = Array.isArray(seeker.skills)
      ? seeker.skills
      : seeker.skills.split(",").map((s) => s.trim().toLowerCase());
    const jobs = await Job.find();

    const recommended = jobs.filter((job) => {
      const jobSkills = Array.isArray(job.qualifications)
        ? job.qualifications.map((q) => q.toLowerCase())
        : job.qualifications.split(",").map((q) => q.trim().toLowerCase());
      return jobSkills.some((skill) => seekerSkills.includes(skill));
    });

    res.status(200).json(recommended);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
