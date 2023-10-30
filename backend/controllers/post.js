import MininstaUser from "../models/user.model.js";

const getAllPosts = async () => {
  const allPosts = await MininstaUser.find().populate().exec();
  return allPosts;
};

export { getAllPosts };
