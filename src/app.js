const express = require("express");
const mongoose = require("mongoose");
const routs = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8080;

mongoose.connect(
    process.env.MONGO_CONN ||
        "mongodb+srv://admin:admin1@cluster0.n8sc6.mongodb.net/Project3?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(routs);

app.listen(port, () => {
    console.log(`sever is running in port: ${port}`);
});
