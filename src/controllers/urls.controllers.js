import { nanoid } from "nanoid";
import { createLink, getLinkById } from "../repository/url.repository.js";

export async function shorten(req, res) {
    const userId = res.locals.user.id;
    const { url } = req.body;
    const shortUrl = nanoid();
    try {
        const result = await createLink({ userId, url, shortUrl });
        if (result.rowCount === 0) {
            return res.status(409).send("Não foi possível encurtar esta url!");
        }
        const { id } = result.rows[0];
        res.status(201).send({ id, shortUrl });
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getUrlById(req, res) {
    const { id } = req.params;
    try {
        const result = await getLinkById(id);
        if (result.rowCount === 0) {
            return req.status(404).send("Esta url encurtada não existe!");
        }
        const { shortUrl, url } = result.rows[0];
        res.send({ id, shortUrl, url });
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

export async function deleteUrl(req, res) {
    const { id } = req.params;

    try {

        res.sendStatus(501); // 204
    } catch (err) {
        res.status(500).send(err.message);
    }
}