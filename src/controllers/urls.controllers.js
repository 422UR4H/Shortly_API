export async function shorten(req, res) {
    res.sendStatus(501); // 201
}

export async function getUrlById(req, res) {
    const { id } = req.params;

    try {

        res.sendStatus(501); // 200
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;
    if (!shortUrl) return res.sendStatus(404);

    try {

        res.sendStatus(501); // res.redirect
    } catch (err) {
        res.status(500).send(err.message);
    }
}