const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MOVIE_DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        return mongoose;
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;