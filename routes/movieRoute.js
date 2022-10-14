const express = require('express');

const router = express.Router();
const Movie = require('../models/Movie');


router.get('/movie/:id', (req, res) => {
    console.log("Yayy!!!")
    Movie.findOne((err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.render('details', { movie: result });
        }
    })
});

router.get('/search/byTitle/:string', async(req, res) => {
    const movies = await Movie.find({ title: new RegExp(`.*${req.params.string}.*`, 'i') }).sort({ rating: -1 }).limit(5).exec();
    res.send(movies);
});

router.get('/watch/:id', (req, res) => {
    Movie.findById(req.params.id).then(result => {
        res.render('watch', { movie: result });
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;