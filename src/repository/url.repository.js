import { db } from "../database/db.connection.js";

export function createUrlVisit(linkId) {
    return db.query(`INSERT INTO visits ("linkId") VALUES ($1);`, [linkId]);
}

export function addUrlVisit(linkId) {
    return db.query(`INSERT INTO visits DEFAULT VALUES;`);
    // INSERT INTO visits DEFAULT VALUES;
    // INSERT INTO visits (linkId) VALUES (1);
}

export async function createLink(body) {
    const { userId, url, shortUrl } = body;
    const result = await db.query(
        `INSERT INTO links ("userId", url, "shortUrl")
        VALUES ($1, $2, $3) RETURNING id;`,
        [userId, url, shortUrl]
    );
    const { id } = result?.rows[0];
    if (!id) return result;

    createUrlVisit(id);
    return result;
}

export function getLinkById(id) {
    return db.query(`SELECT "shortUrl", url FROM links WHERE id = $1;`, [id]);
}