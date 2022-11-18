const mongoose = require('mongoose')

const warndb = new mongoose.Schema({
    guild: String,
    user: String,
    mute: Array,
    warn: Array
})
module.exports = mongoose.model("warndb", warndb)