// adminController.js
export const loginAdmin = async (req, res) => {
  try {
    // Dummy admin login logic
    const { email, password } = req.body;

    if (email === "admin@example.com" && password === "admin123") {
      return res.status(200).json({ message: "Admin logged in" });
    }

    res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
