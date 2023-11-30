const mongoose = require('mongoose');
const { Schema } = mongoose; 

const userSchema = new Schema ({
    googleId: {
        type: String,
        strict: false
    }
});

mongoose.model('users', userSchema)
userSchema.insertOne;