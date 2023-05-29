import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), signIn);

export default authRouter;