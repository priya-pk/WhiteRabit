const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    email:String,
    phone: Number,
    experience: String,
    achievements: String
})

module.exports = mongoose.model('user',userSchema,'user');