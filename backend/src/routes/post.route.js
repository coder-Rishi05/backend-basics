import { Router } from "express";

import { createPost, getAllpost, updatePost } from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost);

router.route("/get").get(getAllpost);

router.route("/update/:id").post(updatePost);

export default router;
