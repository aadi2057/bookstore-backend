const express = require("express");
const bodyParser = require("body-parser");

const Books = require("../models/books");
const Favorites = require("../models/favorites");

const cors = require("./cors");
var authenticate = require("../authenticate");
const { count } = require("../models/favorites");

const favouriteRouter = express.Router();
favouriteRouter.use(bodyParser.json());

favouriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ user: req.user._id })
      .populate("user")
      .populate("books")
      .then(
        (favourites) => {
          if (favourites) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favourites);
          } else {
            var err = new Error("There is no Favourites");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    var bookId = req.body._id;
    Favorites.find({ user: req.user._id })
      .count()
      .populate("user", "books")
      .then(
        (count) => {
          if (count === 0) {
            Favorites.create({ user: req.user._id, books: [bookId] })
              //   .then(
              //     (favourite) => {
              //       favourite.books.push(bookId);
              //       favourite
              //         .save()
              .then(
                (favourite) => {
                  Favorites.findById(favourite._id)
                    .populate("user")
                    .populate("books")
                    .then(
                      (favourite) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(favourite);
                      },
                      (err) => next(err)
                    )
                    .catch((err) => next(err));
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
            //     },
            //     (err) => next(err)
            //   )
            //   .catch((err) => next(err));
          } else {
            Favorites.findOne({ user: req.user._id })
              //   .populate("user")
              //   .populate("books")
              .then(
                (favourites) => {
                  if (favourites) {
                    console.log(favourites.books.indexOf(bookId));
                    if (favourites.books.indexOf(bookId) !== -1) {
                      console.log("Not Updated Favorites!");
                      res.json(favourites);
                    } else {
                      Favorites.update(
                        { user: req.user._id },
                        { $push: { books: bookId } }
                      )
                        //   favorites.books.push(bookId);
                        //   favorites
                        //     .save()
                        .then((result) => {
                          Favorites.find({ user: req.user._id })
                            .populate("user")
                            .populate("dishes")
                            .then(
                              (favourite) => {
                                console.log("Updated");
                                res.statusCode = 200;
                                res.setHeader(
                                  "Content-Type",
                                  "application/json"
                                );
                                res.json({ result, favourite });
                              },
                              (err) => next(err)
                            )
                            .catch((err) => next(err));
                        })
                        .catch((err) => next(err));
                    }
                  }
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not Supported");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.remove({ user: req.user._id })
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

favouriteRouter
  .route("/:bookId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .populate("books")
      .then(
        (favourites) => {
          if (!favourites) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "applicatio/json");
            res.json({ exists: false, favourites: favourites });
          } else {
            if (favourites.books.indexOf(req.params.bookId) < 0) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "applicatio/json");
              res.json({ exists: false, favourites: favourites });
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ exists: true, favorites: favourites });
            }
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    var bookId = req.params.bookId;
    Favorites.findOne({ user: req.user._id })
      //   .populate("user")
      //   .populate("books")
      .then(
        (favorites) => {
          if (favorites) {
            console.log(favorites.books.indexOf(req.params.bookId));
            if (favorites.books.indexOf(bookId) === -1) {
              Favorites.update(
                { user: req.user._id },
                { $push: { books: [req.params.bookId] } }
              )
                .then(
                  (result) => {
                    Favorites.findOne({ user: req.user._id })
                      .populate("user")
                      .populate("books")
                      .then((favourites) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Header", "application/json");
                        res.json({ status: true, result, favourites });
                      });
                  },
                  (err) => next(err)
                )
                .catch((err) => next(err));
            } else {
              res.statusCode = 501;
              res.json({
                message: "Book alredy exists in Favourites",
                status: false,
              });
            }
          } else {
            favs = new Favorites({ user: req.user._id });
            favs.books.push(req.params.bookId);
            favs
              .save()
              .then(
                (result) => {
                  Favorites.find({ user: req.user._id })
                    .populate("user")
                    .populate("books")
                    .then((favourites) => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json({ status: true, result });
                    });
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.update(
      { user: req.user._id },
      { $pull: { books: req.params.bookId } }
    )
      .then(
        (favourite) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favourite);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = favouriteRouter;
