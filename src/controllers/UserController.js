const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
    async store(req, res) {
        const { userName, email, password, userType } = req.body;

        if (!userName || !email || !password) {
            res.status(400).send("Preencha todos os campos");
        }

        const users = await User.find({}).exec();

        if (users.filter((user) => user.userName === userName).length) {
            res.status(400).send("Foi encontrado um user com mesmo login");
        }
        if (users.filter((user) => user.email === email).length) {
            res.status(400).send("Foi encontrado um user com mesmo email");
        }

        console.log(userName, email, password);

        const user = await User.create({
            userName,
            email,
            password,
            userType,
        });
        return res.json(user);
    },
    async login(req, res) {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400).send("Preencha todos os campos");
        }

        const user = await User.findOne({ userName });

        if (!user) {
            res.status(400).json({ error: "Usuário nao encontrado" });
        }

        if (user.password !== req.body.password) {
            res.status(400).json({ error: "Senha nao bate" });
        }

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
};
