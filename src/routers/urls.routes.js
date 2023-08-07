import { Router } from "express";
import { urlsSchema } from "../schemas/urls.schemas.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateAuth from "../middlewares/validateAuth.js";
import {
    deleteUrl,
    getRanking,
    getUrlById,
    openUrl,
    shorten
} from "../controllers/urls.controllers.js";


const router = Router();

router.post("/urls/shorten", validateAuth, validateSchema(urlsSchema), shorten);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", openUrl);
router.delete("/urls/:id", validateAuth, deleteUrl);
router.get("/ranking", getRanking)

export default router;