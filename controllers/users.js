const User = require("../models/User");

const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisissecretkey';
var bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports.controller = (app) => {
  // Local Strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      User.getUserByEmail(email, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false)
          }
        })
      });
    }
  ));
  // register a user
  app.post("/users/register", (req, res) => {
    const { name, email, password } = req.body;
    // const role = req.body.role || 'user';
    const newUser = new User({ name, email, password });
    User.createUser(newUser, (error, user) => {
      if (error) {
        res.status(422).json({
          message: "Something went wrong. Please try again after some time!"
        });
      }
      res.send({
        user
      });
    });
    // res.send(req.body);
    // console.log(req);
  });
  // Login user

  app.post('/users/login',
    passport.authenticate('local', {
      failureRedirect: '/users/login'
    }),
    function (req, res) {
      res.redirect('/');
    });
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  });

  // app.post('/users/login', (req, res) => {
  //     const { email, password } = req.body;
  //     User.getUserByEmail(email, (err, user) => {
  //       if (!user) {
  //         res.status(404).json({ message: "The user does not exist!" });
  //       } else {
  //         User.comparePassword(password, user.password, (error, isMatch) => {
  //           if(error) throw error;
  //           if (isMatch)
  //           {
  //             const payload = { id: user._id };
  //             const token = jwt.sign(payload, jwtOptions.secretOrKey);
  //             res.json({ message: 'ok', token });
  //           }
  //           else {
  //             res.status(401).json({ message: "The password is incorrect" });
  //           }
  //         });
  //       }
  //     });
  // });
}
