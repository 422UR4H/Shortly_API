import { db } from "../database/db.connection.js";

export function createUser(body) {
    const { name, email, password } = body;
    return db.query(
        `INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`,
        [name, email, password]
    );
}

export function getUserByEmail(email) {
    return db.query(
        `SELECT * FROM users
        WHERE email = $1`,
        [email]
    );
}

export function getUserById(id) {
    return db.query(
        `SELECT * FROM users
        WHERE id = $1`,
        [id]
    );
}

