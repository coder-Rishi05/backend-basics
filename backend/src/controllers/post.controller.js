import { Post } from "../models/post.model.js";

// create a Post

const createPost = async (req, res) => {
  try {
    // getting data from user
    const { name, description, age } = req.body;

    // checking empty feilds

    if (!name || !description || !age)
      return res.status(400).json({
        message: "All feilds are necessary !",
      });

    // creating post

    const post = await Post.create({
      name,
      description,
      age,
    });

    res.status(201).json({
      message: "Post created sucessfully",
      post: {
        name: post.name,
        description: post.description,
        age: post.age,
      },
    });
  } catch (error) {
    console.log("Server error !");
    res.status(500).json({ message: "Server error", error });
  }
};

// get all post

const getAllpost = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ message: "Fetched all posts", posts });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// update post

const updatePost = async (req,res) => {
  //   const { name, description, age } = req.body;
  // basic validation
  try {
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({
        message: "No data provided !",
      });

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post) return res.status(404).json({ message: "post not found !" });

    return res.status(201).json({ message: "Post updated sucessfully", post });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export { createPost, getAllpost, updatePost };
