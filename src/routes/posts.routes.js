import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { postSchema } from "../schemas/post.schema.js";
import { createPost, getPostsById, getUserPosts } from "../controllers/posts.controller.js";

const postsRouter = Router();

postsRouter.post("/posts", authValidation, validateSchema(postSchema), createPost);
postsRouter.get("/posts/me", authValidation, getUserPosts);
postsRouter.get("/posts/:id", authValidation, getPostsById)

export default postsRouter;