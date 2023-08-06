import { db } from "../database/db.connection.js";


export function createLink(body) {
    const { userId, url, shortUrl } = body;
    return db.query(
        `INSERT INTO links
            ("userId", url, "shortUrl")
        VALUES
            ($1, $2, $3)
        RETURNING id;`,
        [userId, url, shortUrl]
    );
}

export function getLinkById(id) {
    return db.query(
        `SELECT "userId", "shortUrl", url
        FROM links
        WHERE id = $1;`,
        [id]
    );
}

export function deleteLink(id, userId) {
    return db.query(
        `DELETE FROM links
        WHERE id = $1
        AND "userId" = $2
        RETURNING *;`,
        [id, userId]
    );
}