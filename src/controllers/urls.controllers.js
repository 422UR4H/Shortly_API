export default async function shorten(req, res) {
    res.sendStatus(501); // 201
}

export default async function getUrlById(req, res) {
    const { id } = req.params;

    try {
        
        res.sendStatus(501); // 200
    } catch (err) {
        res.status(500).send(err.message);
    }
}