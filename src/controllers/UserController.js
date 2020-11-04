const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
    async store(req, res) {
        const { userName, email, password, userType } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const users = await User.find({}).exec();

        if (users.filter((user) => user.userName === userName).length) {
            return res.status(400).json({
                error: "Nome de usuário já existente.",
            });
        }
        if (users.filter((user) => user.email === email).length) {
            return res.status(400).json({
                error: "E-mail já cadastrado.",
            });
        }

        const user = await User.create({
            userName,
            email,
            password,
            userType,
        });
        const token = jwt.sign(
            {
                userName,
                userType: user.userType,
            },
            "secret"
        );
        res.cookie("token", token);
        res.status(200).json({ token: token });
    },
    async login(req, res) {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(400).json({ error: "Usuário nao encontrado" });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: "Senha incorreta" });
        } else {
            const token = jwt.sign(
                {
                    userName,
                    userType: user.userType,
                },
                "secret"
            );
            res.cookie("token", token);
            res.status(200).json({ token: token });
        }
    },

    async verify(req, res) {
        const token = req.headers["x-xsrf-token"];

        if (!token) return res.status(401).json({ error: "Access Denied" });

        try {
            const verified = jwt.verify(token, "secret");
            res.status(200).json({ success: true });
        } catch (err) {
            res.status(400).json({ error: "invalid token" });
        }
    },
};
