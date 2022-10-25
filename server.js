const express = require("express");
const app = express();
const cors = require("cors");
const authenticateJWT = require("./middleware/authMiddleware");
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");

app.enable("trust proxy");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }));

app.get("/home", authenticateJWT, (req, res) => {
    res.send("<h1>HOME</h1>");
});
app.use("/users", userRouter);
app.listen(3001, () => {
    console.log(`listening on port 3001`);
});
