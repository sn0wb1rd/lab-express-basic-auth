const router = require("express").Router();

// GET || Add a GET route for /signup
// shows signup page when user visit route
router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs')
  })

// GET || Add GET route for /singin  
router.get('/signin', (req, res, next) => {
  res.render('auth/signin.hbs')
})


// BOTTOM plz: 
// this links router in middleware 
// at the bottom of app.js where the other routes are defines
module.exports = router;