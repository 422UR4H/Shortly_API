import { Router } from "express";
import { usersSchema } from "../schemas/users.schemas.js";
import validateSchema from "../middlewares/validateSchema.js";
import signup from "../controllers/auth.controllers.js";


const router = Router();

router.post("/signup", validateSchema(usersSchema), signup);

export default router;