/* EXPRESS Server */
require('dotenv').config();
const express = require('express');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

/* Mongoose Models */
require('./models/User');

// mongoose.connect(process.env.MONGO_URI);

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App listening on port ' + PORT));


/* Mongoose MongoDB */ 
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.get('/', (req, res) => {
    res.send({user: 'User1'});
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    })
})