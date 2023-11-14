import MininstaUser from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";

const getUserPosts = async (req, res) => {
  try {
    const posts = await MininstaUser.findOne(
      { name: req.params.name },
      { _id: 0, posts: 1 }
    )
      .populate()
      .exec();
    if (!posts) return res.status(200).json({ posts: [] });
    return res.status(200).json({ posts: posts.posts });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allUsersPosts = await MininstaUser.find({}, { _id: 0, posts: 1 })
      .populate()
      .exec();
    const allPosts = allUsersPosts.map((item) => item.posts);
    const postsArray = [];
    for (let posts of allPosts) {
      postsArray.push(...posts);
    }

    const page = parseInt(req.query.page);
    const newPosts = postsArray.slice((page - 1) * 5, page * 5);
    return res.status(200).json({
      posts: newPosts,
      pageCount: parseInt(postsArray.length / 5 + 1),
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

const updatePosts = async (req, res) => {
  try {
    const { post } = req.body;
    const id = uuidv4();
    const user = await MininstaUser.findOne({ name: post.name })
      .populate()
      .exec();
    user.posts.push({ ...post, id });
    await user.save();
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

const updateLikes = async (req, res) => {
  try {
    const { postOwner, postId, name } = req.body;
    const user = await MininstaUser.findOne({ name: postOwner })
      .populate()
      .exec();
    for (const post of user.posts) {
      if (post.id === postId) {
        if (post.likes.includes(name))
          return res.status(200).json({ status: "already liked" });
        post.likes.push(name);
      }
    }
    await user.save();
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

export { getUserPosts, getAllPosts, updatePosts, updateLikes };
