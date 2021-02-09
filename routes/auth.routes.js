const router = require("express").Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model') 


// GET || request for /signup
// shows signup page when user visit route
router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs')
  })

// GET || request for /singin  
router.get('/signin', (req, res, next) => {
  res.render('auth/signin.hbs')
}) 

// POST || request for /singup
router.post("/signup", (req, res, next) => {
  // grab data from input form
  const {name, email, password} = req.body
  // console.log(req.body) // check ||  firsttime for empy object

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  UserModel.create({name, email, password: hash})
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      next(err)
    })
});


// BOTTOM plz: 
// this links router in middleware 
// at the bottom of app.js where the other routes are defines
module.exports = router;  