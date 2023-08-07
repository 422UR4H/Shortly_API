import { db } from "../database/db.connection.js";


export function createLink(body) {
    const { userId, url, shortUrl } = body;
    return db.query(
        `INSERT INTO links ("userId", url, "shortUrl")
        VALUES ($1, $2, $3)
        RETURNING *;`,
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

export function getLinksByUser(id) {
    return db.query(
        `SELECT * FROM links
        WHERE "userId" = $1;`,
        [id]
    );
}

export function addVisitCount(shortUrl) {
    return db.query(
        `UPDATE links
        SET "visitCount" = "visitCount" + 1
        WHERE "shortUrl" = $1
        RETURNING url;`,
        [shortUrl]
    );
}

export function getVisitsSum(id) {
    return db.query(
        `SELECT SUM("visitCount")
        FROM links
        WHERE "userId" = $1;`,
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

export function getRankCount() {
    return db.query(
        `SELECT users.id, users.name, SUM(links) AS "linksCount", SUM(links."visitCount")
        FROM users
        JOIN links ON users.id = links."userId";`
    );
}