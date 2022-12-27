const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Friend = mongoose.model("Friend");

const router = express.Router();

router.use(requireAuth);

router.get("/friends", async( req, res ) => {
    const friends = await Friend.find({ userId: req.user._id});

    res.send(friends);
});

router.post("/friends", async ( req, res ) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res
            .status(422)
            .send({ error: "You must be provide a name and an email"});
    }
    try {
        const friend = new Friend({ name, email, userId: req.user._id});
        await friend.save();
        res.send(friend);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;