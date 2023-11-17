import MininstaUser from "../models/user.model.js";

const getSuggestions = (req, res) => {
  try {
    res.status(200).json({
      communities: [
        { userId: "travel", name: "Travel" },
        { userId: "food", name: "Food" },
        { userId: "culture", name: "Culture" },
      ],
      popularUsers: [
        { userId: "rohithkumar", name: "Rohith Kumar" },
        { userId: "harish", name: "Harish" },
      ],
      tips: ["Use png/ jpg", "Give catchy titles"],
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const response = await MininstaUser.findOneAndDelete({
      userId: req.query.userId,
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
    if (user)
      return res
        .status(200)
        .json({ message: "user already exists", userId: user.userId });
    const userId = req.body.name.split(" ").join("").toLowerCase();
    const newUser = new MininstaUser({
      userId,
      name: req.body.name,
      picture: req.body.picture,
      posts: [],
    });
    newUser.save();
    res.status(200).json({ status: "ok", userId });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

export { getSuggestions, loginUser, deleteUser };
