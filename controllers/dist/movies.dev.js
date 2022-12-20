"use strict";

var MovieSchema = require('../models/Movie.js');

module.exports.controller = function (app) {
  app.get("/movies", function (req, res) {
    MovieSchema.find({}, 'name description release_year genre', function (error, movies) {
      if (error) {
        console.log(error);
      }

      res.send({
        movies: movies
      });
    });
  });
  app.post('/movies', function (req, res) {
    var newMovie = new MovieSchema({
      name: req.body.name,
      description: req.body.description,
      release_year: req.body.release_year,
      genre: req.body.genre
    });
    newMovie.save(function (error, movie) {
      if (error) {
        console.log(error);
      }

      res.send(movie);
    });
  });
};