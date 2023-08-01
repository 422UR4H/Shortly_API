import { Router } from "express";
import { urlsSchema } from "../schemas/urls.schemas.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateAuth from "../middlewares/validateAuth.js";
import { getUrlById, shorten } from "../controllers/urls.controllers.js";


const router = Router();

router.post("/urls/shorten", validateAuth(""), validateSchema(urlsSchema), shorten);
router.get("/urls/:id", getUrlById);

export default router;