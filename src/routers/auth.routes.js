import { Router } from "express";
import { usersSchema } from "../schemas/users.schemas.js";
import { signinSchema } from "../schemas/signin.schemas.js";
import { signup, signin, getUserMe } from "../controllers/auth.controllers.js";
import validateAuth from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js";


const router = Router();

router.post("/signup", validateSchema(usersSchema), signup);
router.post("/signin", validateSchema(signinSchema), signin);
router.get("/users/me", validateAuth, getUserMe)

export default router;