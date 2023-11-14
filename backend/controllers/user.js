import MininstaUser from "../models/user.model.js";

const getSuggestions = (req, res) => {
  try {
    res.status(200).json({
      communities: ["Travel", "Food", "Culture"],
      popularUsers: ["Rohith Kumar", "Harish"],
      tips: ["Use png/ jpg", "Give catchy titles"],
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const response = await MininstaUser.findOneAndDelete({
      name: req.query.name,
    });
    if (response) res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await MininstaUser.findOne({ name: req.body.name })
      .populate()
      .exec();
    if (user) return res.status(200).json({ message: "user already exists" });
    const newUser = new MininstaUser({
      name: req.body.name,
      picture: req.body.picture,
      posts: [],
    });
    newUser.save();
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

export { getSuggestions, loginUser, deleteUser };
