import { Router } from "express";

import {
  createPost,
  deletePost,
  getAllpost,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost);

router.route("/get").get(getAllpost);

router.route("/update/:id").patch(updatePost);

router.route("/delete/:id").delete(deletePost);

export default router;
