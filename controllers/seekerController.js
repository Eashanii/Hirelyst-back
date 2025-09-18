import Seeker from "../models/seeker.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Registration
export const registerSeeker = async (req, res) => {
  try {
    const data = req.body;
    if (!data.fullName || !data.email || !data.password)
      return res
        .status(400)
        .json({ message: "Full name, email and password are required" });

    const existingSeeker = await Seeker.findOne({ email: data.email });
    if (existingSeeker)
      return res
        .status(409)
        .json({ message: "Seeker with this email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Convert skills string to array
    if (data.skills && typeof data.skills === "string") {
      data.skills = data.skills.split(",").map((skill) => skill.trim());
    }

    const seeker = await Seeker.create(data);

    // Generate JWT token
    const token = jwt.sign(
      { id: seeker._id, email: seeker.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      status: "success",
      message: "Seeker registered successfully",
      seeker,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const loginSeeker = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const seeker = await Seeker.findOne({ email });
    if (!seeker) return res.status(404).json({ message: "Seeker not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, seeker.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: seeker._id, email: seeker.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ status: "success", seeker, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all seekers (optional)
export const getAllSeekers = async (req, res) => {
  try {
    const seekers = await Seeker.find();
    res.status(200).json(seekers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
