/* EXPRESS Server */
require('dotenv').config({ path: 'config.env' });

const express = require('express');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

/* Mongoose Models */
require('./models/User');

const DB = process.env.MONGO_URI;

// mongoose.connect(process.env.MONGO_URI);
mongoose
    .connect(DB, {
        usenewurlparser: true,
        useunifiedtopology: true,
    })
    .then(() => {
        console.log("Successfully connected ");
    })
    .catch((error) => {
        console.log(`can not connect to database, ${error}`);
    });

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('App listening on port ' + PORT));


/* Mongoose MongoDB */ 
// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

