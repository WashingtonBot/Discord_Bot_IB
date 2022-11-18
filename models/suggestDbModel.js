const mongoose = require('mongoose')

const suggestdb = new mongoose.Schema({
    guild: String,
    message: String,
    votes : Array
})

module.exports = mongoose.model("suggestdb", suggestdb);