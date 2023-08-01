export async function signup(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(422).send("As senhas não conferem!");
    }

    try {
        // check if email exists in db
        //res.status(409).send("E-mail já cadastrado!");

        // insert user in db

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUser(req, res) {
    try {

        res.sendStatus(501); // 200
    } catch (err) {
        res.status(500).send(err.message);
    }
}