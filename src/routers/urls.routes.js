import { Router } from "express";
import { urlsSchema } from "../schemas/urls.schemas.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateAuth from "../middlewares/validateAuth.js";
import shorten from "../controllers/urls.controllers.js";


const router = Router();

router.post("/urls/shorten", validateAuth(""), validateSchema(urlsSchema), shorten);

export default router;