const router = require("express").Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.model') 

// TODO validate empy field and special characters doen;t work


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
  console.log(req.body) // check ||  firsttime for empy object


  // Validate field input
  if (!name.length || !email.length || !password.length) {
    console.log('check1')
    res.render('auth/signup', {msg: 'Please enter all fields'})
    return;
  }

  // Validate if the user gave in a correct email
  // Using regex
  let re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    res.render('auth/signup', {msg: 'Email is not a valid format'})
  }

  // using ONE method with bcrypt..
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

// POST || request for /singin
router.post("/signin", (req, res, next) => {
  const {email, password} = req.body
  console.log('reqbody: ', req.body) // check

  // implement the same set of validations as you did in signup as well
  // NOTE: We have used the Async method here. Its just to show how it works
  UserModel.findOne({email: email})
      .then((result) => {
        console.log(email)
          //if user exists
          if (result) {
              //Using SYNC bcrypt method -----  
              //check if pw match with the db
              let isMatching = bcrypt.compareSync(password, result.password)
              if (isMatching) {
                console.log('check3')
                  // signin succesfull
                  req.session.userData = result
                  req.session.areyoutired = false
                  res.redirect('/profile')
              }
              else {
                  // when passwords don't match
                  res.render('auth/signin.hbs', {msg: 'Wrong password'})
              }
              // END SYNC method ------------

            //     //Using SYNC bcrypt method -----  
            //     bcrypt.compare(password, result.password)
            //         .then((isMatching) => {
            //             if (isMatching) {
            //                 // when the user successfully signs up
            //                   res.redirect('/profile')
            //             }
            //             else {
            //                 // when passwords don't match
            //                 res.render('auth/signin.hbs', {msg: 'Wrong password'})
            //             }
            //         })
            //      //END ASYNC METHOD -------
            // when email does not exist

            }
            else {
                res.render('auth/signin.hbs', {msg: 'Email does not exist'})
            }
      })
      .catch((err) => {
          next(err)
      }) 
});

// Middleware to prorect routes
const checkLoggedInUser = (req, res, next) => {
  if (req.session.UserData) {
    console.log('check loggenin user')
    next()
  }
  else {
    res.redirect('/signin')
  }
}
// GET || request for /profile
// router.get('/profile', (req, res, next) => {
//   res.render('profile.hbs')
// })
router.get('/profile', checkLoggedInUser, (req, res, next) => {
  let email = req.session.UserData.email
  res.render('profile.hbs', {email})
})





// BOTTOM plz: 
// this links router in middleware 
// at the bottom of app.js where the other routes are defines
module.exports = router;  