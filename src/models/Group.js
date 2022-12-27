const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: true
    },
    memberEmail: {
        type: String,
        required: true,
    },
    memberPhone: {
        type: Number
    }
});

const groupSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    membersOfGroup: [memberSchema]
});

mongoose.model("Group", groupSchema);