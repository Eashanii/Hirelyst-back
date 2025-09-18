import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("reviewer employer");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};
