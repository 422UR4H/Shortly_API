import { createUser, getUserByEmail } from "../repository/auth.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dayjs from "dayjs";


export async function signup(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(422).send("As senhas não conferem!");
    }
    const hash = bcrypt.hashSync(password, 10);

    try {
        const result = await createUser({ name, email, password: hash });
        if (result.rowCount === 0) {
            return res.status(409).send({ message: "E-mail já cadastrado!" });
        }
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signin(req, res) {
    const { email, password } = req.body;
    try {
        const result = await getUserByEmail(email);

        if (result.rowCount === 0) {
            return res.status(401).send({ message: "E-mail não cadastrado!" });
        }
        const user = result.rows[0];

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({ message: "Senha incorreta!" })
        }
        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET_JWT,
            { expiresIn: 24 * 60 * 60 }
        );
        res.send({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUserMe(req, res) {
    const { user } = res.locals;
    try {
        res.send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}