import MininstaUser from "../models/user.model.js";

const findUser = async (email) => {
  const user = await MininstaUser.findOne({ email: email }).populate().exec();
  return user;
};

const deleteUser = async (email) => {
  const response = await MininstaUser.findOneAndDelete({ email: email });
  if (response) return { status: "ok" };
};

const createUser = async (name, email) => {
  const user = await findUser(email);
  if (user) return { msg: "user already exists" };
  const newUser = new MininstaUser({
    name: name,
    email: email,
    posts: [],
  });
  newUser.save();

  return newUser;
};

export { createUser, deleteUser };
