require('dotenv').config({ path: 'config.env' });

/* Mongoose Models -- keep instantiation of Users BEFORE routes */
require('./models/User');

const express = require('express');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

/* Mongoose MongoDB */ 
const DB = process.env.MONGO_URI;

// mongoose
//     .connect(DB, {
//         usenewurlparser: true,
//         useunifiedtopology: true,
//     })
//     .then(() => {
//         console.log("Successfully connected ");
//     })
//     .catch((error) => {
//         console.log(`can not connect to database, ${error}`);
//     });

// mongoose.connect(
//     DB,
//     (err) => {
//         if (err) console.log(err)
//         else console.log("mongdb is connected");
//     }
// );
const connectToMongo = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(DB);
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.log(error);
    }
};
module.exports = connectToMongo;


/* EXPRESS Server */
const app = express();

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('App listening on port ' + PORT));


