const jwt = require("jsonwebtoken");

const verifyToken = (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token, "secret");
        return verified;
    } catch (err) {
        res.status(400).json({ error: "invalid token" });
    }
};

const verifyAdmin = (req, res, next) => {
    const verified = verifyToken(req, res);
    const { userType } = verified;
    if (userType !== "admin") {
        res.status(400).json({ error: "User is not admin" });
    }

    next();
};

const verifyCommon = (req, res, next) => {
    if (verifyToken(req, res)) next();
    else {
        res.status(400).json({ error: "invalid token" });
    }
};

module.exports = { verifyAdmin, verifyCommon };
