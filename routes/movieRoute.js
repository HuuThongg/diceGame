const express = require('express');
const movieController = require('../controllers/movieController')
const router = express.Router();

router.get('/movie/:id', movieController.getMovie);

router.get('/search/byTitle/:string', movieController.findMoviebyString);

router.get('/watch/:id', movieController.watchMovie);

router.get('/video/:id', movieController.getVideo);

module.exports = router;