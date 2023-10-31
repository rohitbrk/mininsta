import MininstaUser from "../models/user.model.js";

// const deleteAll = async () => {
//   await MininstaUser.deleteMany({});
// };

// const app = async () => {
//   await deleteAll();
// };

// app();

const getAllPosts = async () => {
  const allPosts = await MininstaUser.find().populate().exec();
  return allPosts;
};

const updatePosts = async (email, post) => {
  const user = await MininstaUser.findOne({ email: email }).populate().exec();
  user.posts.push(post);
  await user.save();
  return { status: "ok" };
};

const updateLikes = async (postOwner, postId, email) => {
  const user = await MininstaUser.findOne({ email: postOwner })
    .populate()
    .exec();
  for (const post of user.posts) {
    if (post.id === postId) {
      if (post.likes.includes(email)) return { status: "already liked" };
      post.likes.push(email);
    }
  }
  await user.save();
  return { status: "ok" };
};

export { getAllPosts, updatePosts, updateLikes };
