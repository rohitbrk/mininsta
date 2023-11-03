import MininstaUser from "../models/user.model.js";

// const deleteAll = async () => {
//   await MininstaUser.deleteMany({});
// };

// const app = async () => {
//   await deleteAll();
// };

// app();

const getAllPosts = async () => {
  const allUsersPosts = await MininstaUser.find({}, { _id: 0, posts: 1 })
    .populate()
    .exec();
  const allPosts = allUsersPosts.map((item) => item.posts);
  const postsArray = [];
  for (let posts of allPosts) {
    postsArray.push(...posts);
  }
  return postsArray;
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
