export async function signup(req, res) {
    res.sendStatus(501);
}

export async function getUser(req, res) {
    try {

        res.sendStatus(501); // 200
    } catch (err) {
        res.status(500).send(err.message);
    }
}