// controllers/recommendationController.js
import Job from "../models/job.js";
import Seeker from "../models/seeker.js";

export const getRecommendedJobs = async (req, res) => {
  try {
    const { seekerId } = req.params;
    const seeker = await Seeker.findById(seekerId);
    if (!seeker) return res.status(404).json({ message: "Seeker not found" });

    // Normalize seeker data
    const seekerSkills = Array.isArray(seeker.skills)
      ? seeker.skills.map((s) => s.toLowerCase())
      : seeker.skills
      ? seeker.skills.split(",").map((s) => s.trim().toLowerCase())
      : [];
    const seekerExperience = seeker.experience?.toLowerCase() || "";
    const seekerJobType = seeker.jobType?.toLowerCase() || "";
    const seekerWorkPref = seeker.workPreference?.toLowerCase() || "";

    const today = new Date();
    const jobs = await Job.find().lean();

    const recommended = jobs.filter((job) => {
      if (job.expiry_date && new Date(job.expiry_date) < today) return false;

      const jobSkills = Array.isArray(job.qualifications)
        ? job.qualifications.map((q) => q.toLowerCase())
        : job.qualifications
        ? job.qualifications.split(",").map((q) => q.trim().toLowerCase())
        : [];

      const skillMatch = seekerSkills.some((s) => jobSkills.includes(s));
      const expMatch =
        seekerExperience && job.experience?.toLowerCase() === seekerExperience;
      const typeMatch =
        seekerJobType && job.jobType?.toLowerCase() === seekerJobType;
      const workMatch =
        seekerWorkPref && job.workPreference?.toLowerCase() === seekerWorkPref;

      return skillMatch || expMatch || typeMatch || workMatch;
    });

    res.json(recommended);
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({
      message: "Error fetching recommendations",
      error: err.message,
    });
  }
};
