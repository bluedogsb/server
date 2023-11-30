const mongoose = require('mongoose');
const { Schema } = mongoose; 

const userSchema = new Schema ({
    strict: false,
    googleId: String
});

mongoose.model('users', userSchema)