require("dotenv").config();
require ("./models/User");
require ("./models/Friend");
require ("./models/Group");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendRoutes");
const groupRoutes = require("./routes/groupRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(friendRoutes);
app.use(groupRoutes);

const mongoUri = process.env.MONGOURI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
    return console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
    console.log("Error connecting to mongo", err);
});

app.get("/", requireAuth, ( req, res ) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
});