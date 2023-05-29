import { Router } from "express";
import { follow, getFollowers, getFollowing} from "../controllers/user.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const userRouter = Router();

userRouter.get("/followers", authValidation, getFollowers);
userRouter.get("/following", authValidation, getFollowing);
userRouter.post("/following", authValidation, follow);

export default userRouter;