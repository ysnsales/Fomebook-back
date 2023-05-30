import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { postSchema } from "../schemas/post.schema.js";
import { createPost, getPostsById, getUserPosts, addLike, removeLike } from "../controllers/posts.controller.js";

const postsRouter = Router();

postsRouter.post("/posts", authValidation, validateSchema(postSchema), createPost);
postsRouter.get("/posts/me", authValidation, getUserPosts);
postsRouter.get("/posts/:id", authValidation, getPostsById);
postsRouter.put("/posts/:id/addLike", authValidation, addLike);
postsRouter.put("/posts/:id/removeLike", authValidation, removeLike);

export default postsRouter;