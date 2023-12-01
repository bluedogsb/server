const mongoose = require('mongoose');
const { Schema } = mongoose; 

const userSchema = new Schema ({
    googleId: String
});

// async function run() {
//     mongoose.model('users', userSchema);

//     await mongoose.model('users').findOne();
// }

mongoose.model('users', userSchema).findOne();