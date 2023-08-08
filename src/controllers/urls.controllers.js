import { nanoid } from "nanoid";
import {
    addVisitCount,
    createLink,
    deleteLink,
    getLinkById,
    getLinksByUser,
    getRankCount
} from "../repository/urls.repository.js";


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
        res.status(500).send(err.message);
    }
}

export async function getUrlById(req, res) {
    const { id } = req.params;
    try {
        const result = await getLinkById(id);
        if (result.rowCount === 0) {
            return res.status(404).send("Esta url encurtada não existe!");
        }
        const { shortUrl, url } = result.rows[0];
        res.send({ id, shortUrl, url });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const result = await addVisitCount(shortUrl);
        if (result.rowCount === 0) {
            return res.status(404).send("Esta url encurtada não existe!");
        }
        res.redirect(result.rows[0].url);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res) {
    const { user } = res.locals;
    const { id } = req.params;

    try {
        const result = await deleteLink(id, user.id);

        if (result.rowCount === 0) {
            const resultLink = await getLinkById(id);

            if (resultLink.rowCount === 0) {
                return res.status(404).send("Esta url encurtada não existe!");
            } else {
                return res.status(401).send("Acesso negado!");
            }
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getRanking(req, res) {
    try {
        const result = await getRankCount();
        res.send(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getLinks(req, res) {
    const { id } = res.locals.user;
    try {
        const result = await getLinksByUser(id);
        res.send(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}