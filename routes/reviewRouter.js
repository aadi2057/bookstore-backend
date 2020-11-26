const express = require("express");
const bodyParser = require("body-parser");

const Comments = require("../models/comments");

const cors = require("./cors");
var authenticate = require("../authenticate");
const { verify } = require("jsonwebtoken");

const reviewRouter = express.Router();
reviewRouter.use(bodyParser.json());

reviewRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Comments.find(req.query)
      .populate("author")
      .populate("book")
      .then(
        (comments) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(comments);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    if (req.body) {
      req.body.author = req.user._id;
      //   req.body.book = req.params.bookId;
      Comments.create(req.body)
        .then(
          (comment) => {
            Comments.findById(comment._id)
              .populate("author")
              .then((comment) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(comment);
              });
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    } else {
      var err = new Error("Comment not found in request body");
      err.status = 404;
      return next(err);
    }
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported on /comments");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Comments.remove({ book: req.params.bookId })
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

reviewRouter
  .route("/:commentId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Comments.findById(req.params.commentId)
      .populate("author")
      .then(
        (comment) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(comment);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Comments.findById(req.params.commentId)
      .then(
        (comment) => {
          if (comment) {
            if (comment.author === req.user._id) {
              req.body.author = req.user._id;
              Comments.findByIdAndUpdate(
                req.params.commentId,
                { $set: req.body },
                { new: true }
              )
                .then(
                  (comment) => {
                    Comments.findById(comment._id)
                      .populate("author")
                      .then((cmt) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(cmt);
                      });
                  },
                  (err) => next(err)
                )
                .catch((err) => next(err));
            } else {
              err = new Error(
                "Operation failed! You're not authorized to perform this operation"
              );
              err.status = 403;
              return next(err);
            }
          } else {
            err = new Error("Comment " + req.params.commentId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Comments.findById(req.params.commentId)
      .then(
        (comment) => {
          if (comment) {
            if (comment.author === req.user._id) {
              Comments.findByIdAndRemove(req.params.commentId)
                .then(
                  (resp) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(resp);
                  },
                  (err) => next(err)
                )
                .catch((err) => next(err));
            } else {
              err = new Error(
                "Operation failed! You're not authorized to perform this operation"
              );
              err.status = 403;
              return next(err);
            }
          } else {
            err = new Error("Comment " + req.params.commentId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = reviewRouter;
