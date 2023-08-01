import { Router } from "express";
import { usersSchema } from "../schemas/users.schemas.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateAuth from "../middlewares/validateAuth.js";
import { signup, getUser } from "../controllers/auth.controllers.js";


const router = Router();

router.post("/signup", validateSchema(usersSchema), signup);
// router.post("/signin", ..., signin);
router.get("/users/me", validateAuth(""), getUser)

export default router;