import express from "express";
const app = express();

app.use(express.json());
// routes import

import userRouter from "./routes/user.route.js";

import postRouter from "./routes/post.route.js"


// routes declaration

app.use("/api/v1/users", userRouter);

app.use("/api/v1/post", postRouter);



// ex: http://localhost:3001/api/v1/users/register

export default app;
