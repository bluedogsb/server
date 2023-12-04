const mongoose = require('mongoose');
const { Schema } = mongoose; 

const userSchema = new Schema ({
    googleId: String
});

// const userSchema = mongoose.Schema({
//     googleId: { type: String, },
//     name: { type: String },
//     email: {
//         type: String,
//     }
// });

mongoose.model('users', userSchema);