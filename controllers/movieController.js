
const Movie = require('../models/Movie');
const fs = require('fs');

const getMovie = (req, res) => {
    console.log("Yayy!!!")
    Movie.findOne((err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.render('details', { movie: result });
        }
    })
}
const findMoviebyString = async(req, res) => {
    const movies = await Movie.find({ title: new RegExp(`.*${req.params.string}.*`, 'i') }).sort({ rating: -1 }).limit(5).exec();
    res.send(movies);
}
const watchMovie =  (req, res) => {
    Movie.findById(req.params.id).then(result => {
        res.render('watch', { movie: result, Id: req.params.id });
    }).catch(err => {
        console.log(err);
    });
}
const getVideo = async (req, res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const movie = await Movie.findById(req.params.id);
    console.log(movie);
    const videoPath = movie.location;
    const videoSize = fs.statSync(videoPath).size;
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
}

module.exports = {
    getMovie,
    findMoviebyString,
    watchMovie,
    getVideo
}