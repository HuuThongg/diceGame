const express = require('express');
const { MongoClient } = require('mongodb');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const fs = require('fs');
const connectDB = require('./database')
const Movie = require('./models/Movie')
const movieRoutes = require('./routes/movieRoute')

const app = express();
const port = process.env.port || 3000;

connectDB().then(() => {
    console.log("Mongoose connected!");
    app.listen(port, function() {
        console.log('App listening on port 3000!');
    });
})

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/video.html');
});
app.get('/movie', async(req, res) => {
    //console.log(Movie);
    const movies = await Movie.findOne({});
    console.log(movies);
    res.send(movies);
})
app.get('/addMovie', (req, res) => {
    /*
    const movie = new Movie({
        MovieName: "Us (2019)",
        YearRelease: 2019,
        Director: "Jordan Peele",
        Actors: [
            "Lupita Nyong'o",
            "Winston Duke"
        ],
        Genre: [
            "Horror"
        ],
        Description: "A family's serene beach vacation turns to chaos when their doppelgängers appear and begin to terrorize them.",
        IMDb: 6.8
    });
    movie.save()
        .then((result) => res.send(result))
        .catch((err) => console.error(err));
    */
});

app.get('/login', (req, res) => {
    res.send('This is a login page');
});

app.get('/hello/:name/:age', (req, res) => {
    res.send(`Hello ${req.params.name} and you're ${req.params.age} years old`);
});
app.get('/video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = "videos/kr.mp4";
    const videoSize = fs.statSync("videos/kr.mp4").size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});
app.use(movieRoutes);