require ("../models/User");
const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Group = mongoose.model("Group");

const router = express.Router();

router.use(requireAuth);

router.get("/groups", async( req, res ) => {
    const groups = await Group.find({ userId: req.user._id});

    res.send(groups);
});

/*
router.put("/groups/:id", async( req, res ) => {
    const group = await Group.updateOne({ _id: req.params.id }, {
        $push: {
            membersOfGroup: {
                memberName: req.body.memberName,
                memberEmail: req.body.memberEmail,
                memberPhone: req.body.memberPhone
            }
        }
    });
    res.send(group);
});
*/

router.post("/groups", async ( req, res ) => {
    if (!req.body.name ) {
        return res
            .status(422)
            .send({ error: "You must be provide a name"});
    }
    try {
        const group = new Group({
            userId: req.user._id,
            name: req.body.name,
            membersOfGroup: {
                memberName: req.user.name,
                memberEmail: req.user.email,
                memberPhone: req.user.phone
            }
        });
        await group.save();
        res.send(group);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;