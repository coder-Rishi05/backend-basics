import { Router } from "express";

import { createPost, getAllpost } from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost);

router.route("/get").get(getAllpost);

export default router;
