// User model here
const mongoose = require("mongoose");

// define schema
let UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

// define model
let UserModel = mongoose.model('user', UserSchema);

// export your model with 'module exports'
module.exports = UserModel;