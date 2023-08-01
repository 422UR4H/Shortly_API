export default function validateAuth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        // get sessions?
    } catch (err) {
        res.status(500).send(err.message);
    }
    next();
}