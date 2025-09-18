import Application from "../models/Application.js";

export const createApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ message: "Error creating application", error });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("job seeker");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error updating application", error });
  }
};
