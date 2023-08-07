import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserById } from "../repository/auth.repository.js";

dotenv.config();

export default function validateAuth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        jwt.verify(token, process.env.JWT_SECRET || "test", async (error, decoded) => {
            if (error) return res.sendStatus(401);

            const user = (await getUserById(decoded.id))?.rows[0];
            if (!user) return res.sendStatus(404);

            delete user.password;
            res.locals.user = user;

            return next();
        });
    } catch (err) {
        res.status(502).send(err.message);
    }
}