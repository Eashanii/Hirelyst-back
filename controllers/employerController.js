import Employer from "../models/employer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerEmployer = async (req, res) => {
  try {
    const {
      companyName,
      email,
      contactPerson,
      phone,
      industry,
      companySize,
      website,
      password,
    } = req.body;
    const existingEmployer = await Employer.findOne({ email });
    if (existingEmployer)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const employer = await Employer.create({
      companyName,
      email,
      contactPerson,
      phone,
      industry,
      companySize,
      website,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: employer._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employer = await Employer.findOne({ email });
    if (!employer)
      return res
        .status(400)
        .json({ status: "fail", message: "Employer not found" });

    const isMatch = await bcrypt.compare(password, employer.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: "fail", message: "Wrong Password" });

    const token = jwt.sign(
      { id: employer._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: `Server error ${err}` });
  }
};
