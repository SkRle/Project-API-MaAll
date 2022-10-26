const express = require("express");
const app = express();
const cors = require("cors");
const authenticateJWT = require("./middleware/authMiddleware");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRouter");
const publicRouter = require("./routes/publicRouter");
const bodyParser = require("body-parser");

app.enable("trust proxy");
app.use(cors({}));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
  })
);
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use("/users", userRouter);
app.use("/public", publicRouter);
app.use("/thread", authenticateJWT, postRouter);

app.listen(3001, () => {
  console.log(`listening on port 3001`);
});
