const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issue = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    comments: [{
        text: String
    }]
})

module.exports = mongoose.model('issue', issue);