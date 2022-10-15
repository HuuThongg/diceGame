const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    director: String,
    actors: [String],
    genre: [String],
    description: String,
    rating: Number,
    imageURL: String,
    dateRelease: String,
    location: String
});

const Movie = mongoose.model("Movie", movieSchema, "Movie");
module.exports = Movie;